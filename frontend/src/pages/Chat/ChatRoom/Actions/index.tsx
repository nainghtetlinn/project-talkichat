import SendIcon from "@mui/icons-material/Send";
import { Toolbar, Stack, IconButton, TextField } from "@mui/material";
import { AxiosError } from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { enqueueSnackbar } from "notistack";
import { useUserContext } from "../../../../contexts/user";
import { sendMessage } from "../../../../services/message";

export const Actions = () => {
  const { chatId } = useParams();
  const { token } = useUserContext();
  const queryClient = useQueryClient();
  const [message, setMessage] = useState("");

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
    if (!message) return;
    mutate({ token, content: message, chatId: chatId as string });
  }

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
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <IconButton color="primary" disabled={isLoading} onClick={handleSend}>
          <SendIcon />
        </IconButton>
      </Stack>
    </Toolbar>
  );
};
