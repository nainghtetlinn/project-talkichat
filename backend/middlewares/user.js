const { body } = require("express-validator");
const { routeErrorHandler } = require("./error");
const User = require("../models/user");

const registerValidator = [
  body("email")
    .notEmpty()
    .withMessage("Email required")
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
    .withMessage("Password required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("username")
    .notEmpty()
    .withMessage("Username required")
    .isLength({ min: 5 })
    .withMessage("Username must be at least 5 characters long"),
  routeErrorHandler,
];

const loginValidator = [
  body("email")
    .notEmpty()
    .withMessage("Email required")
    .isEmail()
    .withMessage("Email must be valid email")
    .custom((value) => {
      return User.countDocuments({ email: value }).then((count) => {
        if (count === 0) {
          return Promise.reject("User not found");
        }
      });
    }),
  body("password")
    .notEmpty()
    .withMessage("Password required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  routeErrorHandler,
];

const changeUsernameValidator = [
  body("username")
    .notEmpty()
    .withMessage("Username required")
    .isLength({ min: 5 })
    .withMessage("Username must be at least 5 characters long"),
  routeErrorHandler,
];

module.exports = { registerValidator, loginValidator, changeUsernameValidator };
