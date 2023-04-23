import SendIcon from "@mui/icons-material/Send";
import { Toolbar, Stack, IconButton, TextField } from "@mui/material";
import { AxiosError } from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { enqueueSnackbar } from "notistack";
import { useUserContext } from "../../../../contexts/user";
import { useSocketContext } from "../../../../contexts/socket";
import useDebounce from "../../../../hooks/useDebounce";
import { sendMessage } from "../../../../services/message";

export const Actions = () => {
  const { chatId } = useParams();
  const { token, _id, avatar } = useUserContext();
  const { socket } = useSocketContext();
  const queryClient = useQueryClient();
  const [message, setMessage] = useState("");
  const [typing, setTyping] = useState(false);

  const debouncedMessage = useDebounce(message, 1000);

  const { mutate, isLoading } = useMutation(sendMessage, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["messages", chatId]);
      queryClient.invalidateQueries("my-chats-list");
      setMessage("");
    },
    onError: (err: AxiosError) => {
      const res = err.response?.data as any;
      const msg = res.message || "Something went wrong";
      enqueueSnackbar(msg, { variant: "error" });
    },
  });

  function handleSend() {
    if (!message || !socket) return;
    mutate({ token, content: message, chatId: chatId as string });
    setTyping(false);
    socket.emit("stop-typing", chatId);
  }

  function handleChange(
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    setMessage(e.target.value);
    if (typing || !socket) return;
    setTyping(true);
    socket.emit("start-typing", chatId, { avatar, _id });
  }

  useEffect(() => {
    if (!typing || !socket) return;
    setTyping(false);
    socket.emit("stop-typing", chatId, _id);
  }, [debouncedMessage]);

  return (
    <Toolbar>
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{ width: "100%" }}
      >
        <TextField
          fullWidth
          multiline
          variant="standard"
          placeholder="Message"
          value={message}
          onChange={handleChange}
        />
        <IconButton color="primary" disabled={isLoading} onClick={handleSend}>
          <SendIcon />
        </IconButton>
      </Stack>
    </Toolbar>
  );
};
