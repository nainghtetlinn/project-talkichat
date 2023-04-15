import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { Grid, Button, Stack } from "@mui/material";
import { ChatsList } from "./ChatsList";
import { ChatRoom } from "./ChatRoom";
import { CreateGroupChat } from "./CreateGroupChat";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQueryClient } from "react-query";
import { useUserContext } from "../../contexts/user";
import { socket } from "../../services/socket";

export const Chat = () => {
  const { chatId } = useParams();
  const queryClient = useQueryClient();
  const { _id } = useUserContext();
  const [openCreate, setOpenCreate] = useState(false);

  useEffect(() => {
    if (!_id) return;
    socket.emit("setup", { _id });
    socket.on("connected", () => {
      console.log("Connected");
    });
    socket.on("created-group", (chatData) => {
      queryClient.invalidateQueries("chats-list");
      console.log(chatData);
    });
    socket.on("received-message", (messageData) => {
      queryClient.invalidateQueries("chats-list");
      queryClient.invalidateQueries(["messages", chatId]);
      console.log(messageData);
    });
  }, []);

  return (
    <>
      <Grid
        container
        sx={{
          height: "100%",
          overflow: "hidden",
        }}
      >
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: { xs: chatId ? "none" : "block", md: "block" },
            height: "100%",
            overflow: "hidden",
          }}
        >
          <Stack direction="column" sx={{ height: "100%", overflow: "hidden" }}>
            <Button
              variant="contained"
              endIcon={<PeopleAltIcon />}
              sx={{ borderRadius: 200, my: 2 }}
              onClick={() => setOpenCreate(true)}
            >
              Create group chat
            </Button>

            <ChatsList />
          </Stack>
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
          <ChatRoom />
        </Grid>
      </Grid>

      <CreateGroupChat open={openCreate} onClose={() => setOpenCreate(false)} />
    </>
  );
};
