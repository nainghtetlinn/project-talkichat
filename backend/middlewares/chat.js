const { body } = require("express-validator");
const { routeErrorHandler } = require("./error");
const User = require("../models/user");

const accessChatValidator = [
  body("userId")
    .notEmpty()
    .withMessage("UserId require")
    .custom((value) => {
      return User.countDocuments({ _id: value }).then((count) => {
        if (count == 0) {
          return Promise.reject("User not found");
        }
      });
    }),
  routeErrorHandler,
];

const createChatGroupValidator = [
  body("groupName").notEmpty().withMessage("Group name require"),
  body("users")
    .isArray()
    .isLength({ min: 1 })
    .withMessage("Please provide at least one user")
    .custom((value) => {
      return User.countDocuments({ _id: { $in: value } }).then((count) => {
        if (count !== value.length) {
          return Promise.reject(
            "Failed to create group. Invalid ID should not be included"
          );
        }
      });
    }),
  routeErrorHandler,
];

const renameChatGroupValidator = [
  body("groupName").notEmpty().withMessage("Group name require"),
  body("groupId").notEmpty().withMessage("Group ID require"),
  routeErrorHandler,
];

const addMemberValidator = [
  body("users")
    .isArray()
    .isLength({ min: 1 })
    .withMessage("Please provide at least one user")
    .custom((value) => {
      return User.countDocuments({ _id: { $in: value } }).then((count) => {
        if (count !== value.length) {
          return Promise.reject(
            "Failed to add user to group. Invalid ID should not be included"
          );
        }
      });
    }),
  body("groupId").notEmpty().withMessage("Group ID require"),
  routeErrorHandler,
];

const removeMemberValidator = [
  body("users")
    .isArray()
    .isLength({ min: 1 })
    .withMessage("Please provide at least one user")
    .custom((value) => {
      return User.countDocuments({ _id: { $in: value } }).then((count) => {
        if (count !== value.length) {
          return Promise.reject(
            "Failed to remove users from group. Invalid ID should not be included"
          );
        }
      });
    }),
  body("groupId").notEmpty().withMessage("Group ID require"),
  routeErrorHandler,
];

module.exports = {
  accessChatValidator,
  createChatGroupValidator,
  renameChatGroupValidator,
  addMemberValidator,
  removeMemberValidator,
};
