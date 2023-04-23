const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const Chat = require("../models/chat");
const Message = require("../models/message");
const { generateToken } = require("../utils/token");
const {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} = require("firebase/storage");
const { storage } = require("../config/firebase");
const { v4 } = require("uuid");

/* /api/user/register POST {email, password, username, avatar?} */
const register = asyncHandler(async (req, res) => {
  let url;
  const { email, password, username } = req.body;
  const avatar = req.file;
  if (avatar) {
    const acceptTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (avatar.size > 1048576) {
      res.status(400);
      throw new Error("Please provide image under 1mb");
    }
    if (!acceptTypes.includes(avatar.mimetype)) {
      res.status(400);
      throw new Error("Please provide image in png, jpeg or jpg");
    }
    const avatarRef = ref(
      storage,
      `/avatars/${username.toLowerCase()}-${v4()}`
    );
    const snapshot = await uploadBytesResumable(avatarRef, avatar.buffer, {
      contentType: avatar.mimetype,
    });
    url = await getDownloadURL(snapshot.ref);
  }

  const user = await User.create({
    email,
    password,
    username,
    avatar: url || null,
  });

  // get super user id
  const sui = process.env.SUPER_USER_ID;
  const suiMessage = process.env.SUI_MESSAGE;
  if (sui && suiMessage) {
    // auto access with super user acc
    let chatData = {
      isGroupChat: false,
      users: [user._id, sui],
    };
    const chat = await Chat.create(chatData);

    // auto message to newly created user with my acc
    const message = await Message.create({
      content: suiMessage,
      chat: chat._id,
      sender: sui,
    });

    // change latest message
    await Chat.findByIdAndUpdate(chat._id, {
      latestMessage: message._id,
    });
  }

  res.status(201).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    avatar: user.avatar,
    token: generateToken(user._id),
  });
});

/* /api/user/login POST {email, password} */
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const match = await user.comparePassword(password);
  if (match) {
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

/* /api/user/token GET */
const token = asyncHandler(async (req, res) => {
  const user = req.user;

  res.status(200).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    avatar: user.avatar,
    token: generateToken(user._id),
  });
});

/* /api/user?search=username GET */
const searchUser = asyncHandler(async (req, res) => {
  const keyword = req.query.search;
  if (keyword) {
    const users = await User.find({
      _id: { $ne: req.user._id },
      username: { $regex: keyword, $options: "i" },
    }).select("-password");
    res.status(200).json(users);
  } else {
    res.status(400);
    throw new Error("Need keyword to search");
  }
});

/* /api/user/update PUT {avatar, username} */
const updateUser = asyncHandler(async (req, res) => {
  const { username } = req.body;
  req.user.username = username;
  const oldUrl = req.user.avatar;
  let url;
  const avatar = req.file;
  if (avatar) {
    const acceptTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (avatar.size > 1048576) {
      res.status(400);
      throw new Error("Please provide image under 1mb");
    }
    if (!acceptTypes.includes(avatar.mimetype)) {
      res.status(400);
      throw new Error("Please provide image in png, jpeg or jpg");
    }
    const avatarRef = ref(
      storage,
      `/avatars/${username.toLowerCase()}-${v4()}`
    );
    const snapshot = await uploadBytesResumable(avatarRef, avatar.buffer, {
      contentType: avatar.mimetype,
    });
    url = await getDownloadURL(snapshot.ref);
    req.user.avatar = url;

    // deleting old avatar from oldUrl
    const storageRef = ref(storage, oldUrl);
    await deleteObject(storageRef);
  }
  const user = await req.user.save();

  res.status(200).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    avatar: user.avatar,
    token: generateToken(user._id),
  });
});

module.exports = {
  register,
  login,
  token,
  searchUser,
  updateUser,
};
