const asyncHandler = require("express-async-handler");
const { decodeToken } = require("../utils/token");
const User = require("../models/user");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = decodeToken(token);
      const user = await User.findById(decoded.id).select("-password");
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(404);
        throw new Error("Broken token");
      }
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };
