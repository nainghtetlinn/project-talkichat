import { Container } from "@mui/material";
import { lazy, useEffect } from "react";
import { useQueryClient } from "react-query";
import { Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./pages/NotFound";
import { Loadable, Loading } from "./components";
const Home = Loadable(lazy(() => import("./pages/Home")));
const Login = Loadable(lazy(() => import("./pages/Login")));
const Signup = Loadable(lazy(() => import("./pages/Signup")));
const Chat = Loadable(lazy(() => import("./pages/Chat")));

import { useSocketContext } from "./contexts/socket";
import { useUserContext } from "./contexts/user";
import { MessageType, ChatType } from "./@types";

function App() {
  const queryClient = useQueryClient();
  const { _id, token } = useUserContext();
  const { initSocket, socket } = useSocketContext();

  useEffect(() => {
    if (_id) {
      initSocket();
    }
    if (!_id || !socket) return;
    console.log("Socket active");
    socket.on("connect", () => {
      socket.emit("setup", _id);
    });
    socket.on("new-chat", (data: ChatType) => {
      queryClient.invalidateQueries("my-chats-list");
    });
    socket.on("message-received", (data: MessageType) => {
      if (data.sender._id === _id) return;
      queryClient.invalidateQueries(["messages", data.chat]);
      console.log("message-received");
    });
    socket.on("message-received-noti", (data: MessageType) => {
      if (data.sender._id === _id) return;
      queryClient.invalidateQueries("my-chats-list");
      console.log("message-received-noti");
    });
    socket.on("group-created", (data: ChatType) => {
      if (data.groupAdmin._id === _id) return;
      queryClient.invalidateQueries("my-chats-list");
    });
  }, [_id, socket]);

  if (token && !_id) return <Loading />;

  return (
    <>
      <Container
        maxWidth="lg"
        disableGutters
        sx={{ height: "100vh", overflow: "hidden" }}
      >
        <Routes>
          <Route path="/" element={!_id ? <Home /> : <Navigate to="/chat" />} />
          <Route
            path="/signup"
            element={_id ? <Navigate to="/chat" /> : <Signup />}
          />
          <Route
            path="/login"
            element={_id ? <Navigate to="/chat" /> : <Login />}
          />
          <Route path="/chat" element={!_id ? <Navigate to="/" /> : <Chat />} />
          <Route
            path="/chat/:chatId"
            element={!_id ? <Navigate to="/" /> : <Chat />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
