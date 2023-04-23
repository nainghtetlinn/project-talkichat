import { createContext, useContext, useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";

const ENDPOINT = import.meta.env.PROD
  ? import.meta.env.VITE_PRODUCTION_SERVER
  : import.meta.env.VITE_DEVELOPMENT_SERVER;

const socketContext = createContext<{
  socket: Socket | null;
  initSocket: () => void;
  disconnectSocket: () => void;
}>({ socket: null, initSocket: () => {}, disconnectSocket: () => {} });

const SocketContextProvider = ({ children }: { children: JSX.Element }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  function initSocket() {
    if (!socket) {
      setSocket(io(ENDPOINT));
      console.log("Init Socket");
    }
  }

  function disconnectSocket() {
    if (socket) {
      socket.disconnect();
      setSocket(null);
      console.log("Disconnect Socket");
    }
  }

  return (
    <socketContext.Provider
      value={{
        initSocket,
        disconnectSocket,
        socket,
      }}
    >
      {children}
    </socketContext.Provider>
  );
};

const useSocketContext = () => useContext(socketContext);

export { useSocketContext, SocketContextProvider };
