const express = require("express");
//////////
const { protect } = require("../middlewares/auth");
const {
  getAllMessagesValidator,
  sendMessageValidator,
} = require("../middlewares/message");
const { getAllMessages, sendMessage } = require("../controllers/message");
//////////
const router = express.Router();

/* /api/message GET POST { content } */
router
  .route("/:chatId")
  .get(protect, getAllMessages)
  .post(protect, sendMessageValidator, sendMessage);

module.exports = router;
