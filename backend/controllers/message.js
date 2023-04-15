const asyncHandler = require("express-async-handler");
const Message = require("../models/message");
const Chat = require("../models/chat");

/* /api/message/:chatId POST { content } */
const sendMessage = asyncHandler(async (req, res) => {
  const { chatId } = req.params;
  const { content } = req.body;
  const user = req.user;
  const isChat = await Chat.findOne({ _id: chatId, users: { $in: user._id } });
  if (!isChat) {
    res.status(400);
    throw new Error("Cannot send message");
  }
  let message = await Message.create({
    content,
    chat: isChat._id,
    sender: user._id,
  });
  const result = await Message.findById(message._id)
    .populate("sender", "-password")
    .populate("chat");
  await Chat.findByIdAndUpdate(isChat._id, {
    unreadMessages: message._id,
  });
  res.status(201).json(result);
});

/* /api/message/:chatId GET */
const getAllMessages = asyncHandler(async (req, res) => {
  const user = req.user;
  const { chatId } = req.params;

  const isChat = await Chat.findOne({ _id: chatId, users: { $in: user._id } });
  if (!isChat) {
    res.status(400);
    throw new Error("Cannot get messages");
  }
  const messages = await Message.find({ chat: chatId }).populate(
    "sender",
    "username email avatar"
  );

  res.status(200).json(messages);
});

module.exports = { sendMessage, getAllMessages };
