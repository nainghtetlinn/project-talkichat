import { Box, Container } from "@mui/material";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Home, Signup, Login, Chat, NotFound } from "./pages";
import { Header, Toast } from "./components";

import { useLayoutEffect, useEffect } from "react";
import { useUserContext } from "./contexts/user";
import { loginWithToken } from "./services/user";

const token = localStorage.getItem("token");

function App() {
  const navigate = useNavigate();
  const { username, putUser, _id } = useUserContext();

  useLayoutEffect(() => {
    const a = async () => {
      if (token) {
        try {
          const data = await loginWithToken(token);
          putUser(data);
        } catch (error: any) {
          localStorage.removeItem("token");
        }
      }
    };
    a();
  }, []);

  useEffect(() => {
    if (!username) {
      navigate("/");
    }
  }, [username]);

  return (
    <Box
      sx={{
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Toast />
      <Header />
      <Container
        maxWidth="lg"
        sx={{
          height: "100%",
          overflow: "hidden",
        }}
      >
        <Routes>
          <Route
            path="/"
            element={!!username ? <Navigate to="/chat" /> : <Home />}
          />
          <Route path="/chat" element={username && <Chat />} />
          <Route path="/chat/:chatId" element={username && <Chat />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </Box>
  );
}

export default App;
