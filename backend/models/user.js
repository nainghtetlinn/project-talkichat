const mongoose = require("mongoose");
const { hashPassword, comparePassword } = require("../utils/password");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: { type: String, required: true, trim: true },
    username: { type: String, required: true, trim: true },
    avatar: { type: String },
    isActive: { type: Boolean, default: false },
  },
  { timestamps: true }
);
UserSchema.methods.comparePassword = async function (password) {
  return await comparePassword(password, this.password);
};
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await hashPassword(this.password);
});
const User = mongoose.model("User", UserSchema);
module.exports = User;
