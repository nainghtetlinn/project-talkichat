const bcrypt = require("bcrypt");

const hashPassword = async (pw) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(pw, salt);
};
const comparePassword = async (pw, hashedPw) => {
  return await bcrypt.compare(pw, hashedPw);
};

module.exports = { hashPassword, comparePassword };
