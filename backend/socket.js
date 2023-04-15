let io;

const socketio = require("socket.io");
const { instrument } = require("@socket.io/admin-ui");

module.exports = {
  init: (server) => {
    io = socketio(server, {
      cors: {
        origin:
          process.env.NODE_ENV === "production"
            ? process.env.PRODCTION_CORS_ORIGIN
            : process.env.DEVELOPMENT_CORS_ORIGIN,
      },
    });
    instrument(io, { auth: false });
    return io;
  },
  getIO: () => {
    if (!io) throw new Error("Socket.io not initialized");
    return io;
  },
};
