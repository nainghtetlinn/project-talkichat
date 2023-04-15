const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: { type: String, required: true, trim: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
  },
  { timestamps: true }
);
const Message = mongoose.model("Message", MessageSchema);
module.exports = Message;
