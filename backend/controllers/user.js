const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const { generateToken } = require("../utils/token");
const {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} = require("firebase/storage");
const { storage } = require("../config/firebase");
const { v4 } = require("uuid");

/* /api/user/register POST {email, password, username, avatar?} */
const register = asyncHandler(async (req, res) => {
  let url;
  const { username, email, password } = req.body;
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
    username,
    email,
    password,
    avatar: url || null,
  });
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

/* /api/user/change/username PUT {username} */
const changeUsername = asyncHandler(async (req, res) => {
  const { username } = req.body;
  req.user.username = username;
  const user = await req.user.save();

  res.status(200).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    avatar: user.avatar,
    token: generateToken(user._id),
  });
});

/* /api/user/change/avatar PUT {avatar} */
const changeAvatar = asyncHandler(async (req, res) => {
  const oldurl = req.user.avatar;

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
  }
  req.user.avatar = url || null;
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
  changeAvatar,
  changeUsername,
};
