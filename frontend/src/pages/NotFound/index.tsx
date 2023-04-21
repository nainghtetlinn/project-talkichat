import { Stack, Typography, Link } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState<number>(5);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prev) => (prev -= 1));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (count === 0) navigate("/");
  }, [count]);

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      spacing={1}
      sx={{ height: "100%", overflow: "hidden" }}
    >
      <Typography variant="h4">TalkiChat</Typography>
      <Typography>404 | Page not found</Typography>
      <Link onClick={() => navigate("/")} sx={{ cursor: "pointer" }}>
        back to home
      </Link>
      <Typography>Redirect home page in {count}</Typography>
    </Stack>
  );
};

export default NotFound;
