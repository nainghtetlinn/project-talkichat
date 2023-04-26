import { createContext, useContext, useState } from "react";
import { io, Socket } from "socket.io-client";

const ENDPOINT = import.meta.env.VITE_BACKEND_SERVER;

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
    }
  }

  function disconnectSocket() {
    if (socket) {
      socket.disconnect();
      setSocket(null);
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
