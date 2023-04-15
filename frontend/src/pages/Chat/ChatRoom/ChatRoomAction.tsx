import SendIcon from "@mui/icons-material/Send";
import { Stack, TextField, IconButton } from "@mui/material";

import { useState } from "react";
import { useMutation } from "react-query";
import { useToastContext } from "../../../contexts/toast";
import { useUserContext } from "../../../contexts/user";
import { sendMessage } from "../../../services/message";
import { socket } from "../../../services/socket";

type Props = { chatId: string };

export const ChatRoomAction = ({ chatId }: Props) => {
  const { showToast } = useToastContext();
  const { token } = useUserContext();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const { mutate } = useMutation(sendMessage, {
    onSuccess: (data) => {
      setContent("");
      socket.emit("send-message", data);
    },
    onError: (error: any) => {
      showToast({ type: "error", msg: error.message });
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  async function handleSend() {
    if (!content || loading) return;
    setLoading(true);
    mutate({
      token,
      chatId,
      content,
    });
  }

  return (
    <>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ py: 2 }}>
        <TextField
          variant="standard"
          fullWidth
          placeholder="Send message"
          value={content}
          type="text"
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              handleSend();
            }
          }}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
        <IconButton onClick={handleSend}>
          <SendIcon />
        </IconButton>
      </Stack>
    </>
  );
};
