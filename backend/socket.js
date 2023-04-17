let io;

const { Server } = require("socket.io");
const { instrument } = require("@socket.io/admin-ui");

module.exports = {
  init: (server) => {
    io = new Server(server, {
      cors: {
        origin:
          process.env.NODE_ENV === "production"
            ? process.env.PRODCTION_CORS_ORIGIN
            : [process.env.DEVELOPMENT_CORS_ORIGIN, "https://admin.socket.io"],
        credentials: true,
      },
    });
    instrument(io, {
      auth: false,
    });
    return io;
  },
  getIO: () => io,
};
