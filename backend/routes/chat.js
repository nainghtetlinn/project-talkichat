const express = require("express");
//////////
const User = require("../models/user");
const { protect } = require("../middlewares/auth");
const {
  accessChatValidator,
  createChatGroupValidator,
  renameChatGroupValidator,
  addMemberValidator,
  removeMemberValidator,
} = require("../middlewares/chat");
const {
  accessChat,
  getChat,
  fetchChats,
  createGroupChat,
  renameGroupChat,
  addMember,
  removeMember,
} = require("../controllers/chat");
//////////
const router = express.Router();

/* /api/chat GET POST {userId} */
router
  .route("/")
  .get(protect, fetchChats)
  .post(protect, accessChatValidator, accessChat);

/* /api/chat/:chatId GET */
router.route("/:chatId").get(protect, getChat);

/* /api/chat/group POST {groupName, users} */
router.route("/group").post(protect, createChatGroupValidator, createGroupChat);

/* /api/chat/group/rename PUT {groupName, groupId} */
router
  .route("/group/rename")
  .put(protect, renameChatGroupValidator, renameGroupChat);

/* /api/chat/group/add PUT {users, groupId} */
router.route("/group/add").put(protect, addMemberValidator, addMember);

/* /api/chat/group/remove PUT {users, groupId} */
router.route("/group/remove").put(protect, removeMemberValidator, removeMember);

module.exports = router;
