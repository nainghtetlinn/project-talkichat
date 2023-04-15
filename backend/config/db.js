const mongoose = require("mongoose");
const connectDB = (cb) => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(process.env.MONGO_URI)
    .then((conn) => {
      console.log(
        `MongoDB connected: ${conn.connection.host}`.yellow.underline
      );
      cb();
    })
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
};
module.exports = connectDB;
