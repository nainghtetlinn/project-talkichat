const asyncHandler = require("express-async-handler");
const Chat = require("../models/chat");

/* /api/chat POST {userId} */
const accessChat = asyncHandler(async (req, res) => {
  const user = req.user;
  const { userId } = req.body;

  let isChat = await Chat.findOne({
    isGroupChat: false,
    $and: [{ users: { $in: user._id } }, { users: { $in: userId } }],
  })
    .populate("users", "-password")
    .populate({
      path: "latestMessage",
      populate: { path: "sender", select: "-password" },
    });
  if (!isChat) {
    let chatData = {
      isGroupChat: false,
      users: [user._id, userId],
    };
    const createdChat = await Chat.create(chatData);
    const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
      "users",
      "-password"
    );

    const io = require("../socket").getIO();
    io.to(userId).emit("new-chat", fullChat);

    res.status(201).json(fullChat);
  } else {
    res.status(200).json(isChat);
  }
});

/* /api/chat/:chatId GET */
const getChat = asyncHandler(async (req, res) => {
  const user = req.user;
  const { chatId } = req.params;

  const chat = await Chat.findOne({ _id: chatId, users: { $in: user._id } })
    .populate("users", "-password")
    .populate("groupAdmin", "-password")
    .populate({
      path: "latestMessage",
      populate: { path: "sender", select: "-password" },
    })
    .sort({ updatedAt: -1 });
  if (!chat) {
    res.status(404);
    throw new Error("Chat not found");
  }
  res.status(200).json(chat);
});

/* /api/chat GET */
const fetchChats = asyncHandler(async (req, res) => {
  const user = req.user;
  const chats = await Chat.find({ users: { $in: user._id } })
    .populate("users", "-password")
    .populate("groupAdmin", "-password")
    .populate({
      path: "latestMessage",
      populate: { path: "sender", select: "-password" },
    })
    .sort({ updatedAt: -1 });
  res.status(200).json(chats);
});

/* /api/chat/group POST {groupName, users} */
const createGroupChat = asyncHandler(async (req, res) => {
  const user = req.user;
  const { groupName, users } = req.body;
  users.push(user._id.toString());

  const groupChat = await Chat.create({
    chatName: groupName,
    users,
    isGroupChat: true,
    groupAdmin: user._id,
  });

  const populatedGroupChat = await Chat.findOne({
    _id: groupChat._id,
  })
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  const io = require("../socket").getIO();
  populatedGroupChat.users.forEach((u) => {
    if (u._id.toString() === user._id.toString()) return;
    io.to(u._id.toString()).emit("group-created", populatedGroupChat);
  });

  res.status(201).json(populatedGroupChat);
});

/* /api/chat/group/rename PUT {groupName, groupId} */
const renameGroupChat = asyncHandler(async (req, res) => {
  const user = req.user;
  const { groupId, groupName } = req.body;
  const groupChat = await Chat.findOneAndUpdate(
    { _id: groupId, groupAdmin: user._id },
    { chatName: groupName },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password")
    .populate({
      path: "latestMessage",
      populate: { path: "sender", select: "-password" },
    });

  if (!groupChat) {
    res.status(404);
    throw new Error("Failed to change group name");
  }
  res.status(200).json(groupChat);
});

/* /api/chat/group/add PUT {users, groupId} */
const addMember = asyncHandler(async (req, res) => {
  const user = req.user;
  const { users, groupId } = req.body;

  const groupChat = await Chat.findOneAndUpdate(
    {
      _id: groupId,
      groupAdmin: user._id,
      users: { $nin: users },
    },
    { $push: { users: { $each: users } } },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password")
    .populate({
      path: "latestMessage",
      populate: { path: "sender", select: "-password" },
    });

  if (!groupChat) {
    res.status(404);
    throw new Error("Failed to add user to group");
  }
  res.status(201).json(groupChat);
});

/* /api/chat/group/remove PUT {users, groupId} */
const removeMember = asyncHandler(async (req, res) => {
  const user = req.user;
  const { users, groupId } = req.body;
  const groupChat = await Chat.findOneAndUpdate(
    {
      _id: groupId,
      groupAdmin: user._id,
      users: { $in: users },
    },
    { $pull: { users: { $each: users } } },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password")
    .populate({
      path: "latestMessage",
      populate: { path: "sender", select: "username avatar" },
    });

  if (!groupChat) {
    res.status(400);
    throw new Error("Failed to remove user from group");
  }
  res.status(200).json(groupChat);
});

module.exports = {
  accessChat,
  getChat,
  fetchChats,
  createGroupChat,
  renameGroupChat,
  addMember,
  removeMember,
};
