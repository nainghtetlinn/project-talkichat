const { body } = require("express-validator");
const { routeErrorHandler } = require("./error");
const User = require("../models/user");

const registerValidator = [
  body("email")
    .notEmpty()
    .withMessage("Email require")
    .isEmail()
    .withMessage("Email must be valid email")
    .custom((value) => {
      return User.countDocuments({ email: value }).then((count) => {
        if (count > 0) {
          return Promise.reject("User already exists");
        }
      });
    }),
  body("password")
    .notEmpty()
    .withMessage("Password require")
    .isLength({ min: 6 })
    .withMessage("Password must have at least 6 characters"),
  body("username")
    .notEmpty()
    .withMessage("Username require")
    .isLength({ min: 5 })
    .withMessage("Username must have at least 5 characters"),
  routeErrorHandler,
];

const loginValidator = [
  body("email")
    .notEmpty()
    .withMessage("Email require")
    .isEmail()
    .withMessage("Email must be valid email")
    .custom((value) => {
      return User.countDocuments({ email: value }).then((count) => {
        if (count == 0) {
          return Promise.reject("User not found");
        }
      });
    }),
  body("password")
    .notEmpty()
    .withMessage("Password require")
    .isLength({ min: 6 })
    .withMessage("Password must have at least 6 characters"),
  routeErrorHandler,
];

const changeUsernameValidator = [
  body("username")
    .notEmpty()
    .withMessage("Username require")
    .isLength({ min: 5 })
    .withMessage("Username must have at least 5 characters"),
  routeErrorHandler,
];

module.exports = {
  registerValidator,
  loginValidator,
  changeUsernameValidator,
};
