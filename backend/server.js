require("colors");
require("dotenv").config();

const http = require("http");
const cors = require("cors");
const express = require("express");
const app = express();
const server = http.createServer(app);

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.PRODCTION_CORS_ORIGIN
        : process.env.DEVELOPMENT_CORS_ORIGIN,
  })
);
app.use(require("helmet")());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Hello" });
});

app.use("/api/user", require("./routes/user"));
app.use("/api/chat", require("./routes/chat"));
app.use("/api/message", require("./routes/message"));

const { errorHandler } = require("./middlewares/error");
app.use(errorHandler);

const connectDB = require("./config/db");
connectDB(() => {
  const port = process.env.PORT || 5000;
  server.listen(port, () => {
    console.log(`Server running on port ${port}`.cyan.underline);
  });

  const io = require("./socket").init(server);

  io.on("connection", (socket) => {
    console.log(`Connected to socket`);
    socket.on("setup", (id) => {
      socket.join(id);
    });
    socket.on("send-message", (message) => {
      message.chat.users.forEach((user) => {
        socket.to(user).emit("message-received", message);
      });
    });
    socket.on("create-group", (group) => {
      group.users.forEach((user) => {
        socket.to(user._id).emit("group-created", group);
      });
    });
  });
});
