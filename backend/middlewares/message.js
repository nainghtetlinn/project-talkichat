const { body } = require("express-validator");
const { routeErrorHandler } = require("./error");

const sendMessageValidator = [
  body("content").notEmpty().withMessage("Provide some content"),
  routeErrorHandler,
];

module.exports = { sendMessageValidator };
