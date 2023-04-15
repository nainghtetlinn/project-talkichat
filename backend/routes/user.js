const express = require("express");
const multer = require("multer");
//////////
const { protect } = require("../middlewares/auth");
const {
  registerValidator,
  loginValidator,
  changeUsernameValidator,
} = require("../middlewares/user");
const {
  register,
  login,
  token,
  searchUser,
  changeAvatar,
  changeUsername,
} = require("../controllers/user");
//////////
const router = express.Router();

/* /api/user/register POST {email, password, username, avatar?} */
router
  .route("/register")
  .post(multer().single("avatar"), registerValidator, register);

/* /api/user/login POST {email, password} */
router.route("/login").post(loginValidator, login);

/* /api/user/token GET */
router.route("/token").get(protect, token);

/* /api/user?search=username GET */
router.route("/").get(protect, searchUser);

/* /api/user/change/username PUT {username} */
router
  .route("/change/username")
  .put(protect, changeUsernameValidator, changeUsername);

/* /api/user/change/avatar PUT {avatar} */
router
  .route("/change/avatar")
  .put(protect, multer().single("avatar"), changeAvatar);

module.exports = router;
