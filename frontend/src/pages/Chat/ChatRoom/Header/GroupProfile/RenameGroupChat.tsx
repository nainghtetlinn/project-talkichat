import {
  TextField,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";

import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { enqueueSnackbar } from "notistack";
import { useUserContext } from "../../../../../contexts/user";
import { renameGroupChat } from "../../../../../services/chat";

type Props = { open: boolean; onClose: () => void; groupName: string };

export const RenameGroupChat = ({ open, onClose, groupName }: Props) => {
  const { token } = useUserContext();
  const { chatId } = useParams();
  const queryClient = useQueryClient();

  const [name, setName] = useState(groupName);

  const { mutate } = useMutation(renameGroupChat, {
    onSuccess: () => {
      queryClient.invalidateQueries(["chatId", chatId]);
      onClose();
    },
  });

  const handleRename = () => {
    if (!token || !name || !chatId) {
      enqueueSnackbar("Cannot rename group chat", { variant: "error" });
      return;
    }
    mutate({ groupId: chatId, groupName: name, token });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogContent>
        <TextField
          fullWidth
          label="Group name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          sx={{ textTransform: "capitalize" }}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{ textTransform: "capitalize" }}
          onClick={handleRename}
        >
          Rename
        </Button>
      </DialogActions>
    </Dialog>
  );
};
