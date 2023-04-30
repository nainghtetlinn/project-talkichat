import { Grid, Stack, Typography } from "@mui/material";
import { ChatRoom } from "./ChatRoom";
import { Sidebar } from "./Sidebar";
import { useParams } from "react-router-dom";

const Chat = () => {
  const { chatId } = useParams();

  return (
    <>
      <Grid container sx={{ height: "100%", overflow: "hidden" }}>
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: {
              xs: chatId ? "none" : "block",
              md: "block",
            },
            height: "100%",
            overflow: "hidden",
          }}
        >
          <Sidebar />
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
          sx={{
            display: { xs: chatId ? "block" : "none", md: "block" },
            height: "100%",
            overflow: "hidden",
          }}
        >
          {chatId ? (
            <ChatRoom />
          ) : (
            <Stack
              alignItems="center"
              justifyContent="center"
              sx={{ height: "100%" }}
            >
              <Typography variant="h5">
                Click conversation to start chatting.
              </Typography>
            </Stack>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Chat;
