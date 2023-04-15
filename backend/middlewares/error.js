const { validationResult } = require("express-validator");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode || 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : null,
  });
};

const routeErrorHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    throw new Error(errors.array()[0].msg);
  }
  next();
};

module.exports = { errorHandler, routeErrorHandler };
