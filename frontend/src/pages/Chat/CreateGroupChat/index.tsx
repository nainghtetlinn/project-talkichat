import SearchIcon from "@mui/icons-material/Search";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  TextField,
  Typography,
  Stack,
  CircularProgress,
  Button,
} from "@mui/material";
import { UsersList } from "./UsersList";
import { SelectedUsersList } from "./SelectedUsersList";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useUserContext } from "../../../contexts/user";
import { useToastContext } from "../../../contexts/toast";
import { searchUser } from "../../../services/user";
import { createGroupChat } from "../../../services/chat";
import { socket } from "../../../services/socket";

type Props = { open: boolean; onClose: () => void };

export const CreateGroupChat = ({ open, onClose }: Props) => {
  const queryClient = useQueryClient();
  const { token } = useUserContext();
  const { showToast } = useToastContext();

  const [loading, setLoading] = useState(false);
  const [isNew, setIsNew] = useState(true);
  const [startSearch, setStartSearch] = useState(false);
  const [search, setSearch] = useState("");

  const [name, setName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<any[]>([]);

  const { data, isLoading, isError, isFetched } = useQuery(
    "search",
    () => searchUser({ search, token }),
    {
      enabled: startSearch,
      onSettled: () => {
        setStartSearch(false);
        setIsNew(false);
      },
    }
  );

  function handleSearch() {
    if (search !== "") {
      setStartSearch(true);
    }
  }

  function handleSelect(user: any) {
    const isSelected = selectedUsers.find((u) => user._id === u._id);
    if (isSelected) return;
    setSelectedUsers((prev) => [...prev, user]);
  }

  function handleDeselect(id: string) {
    setSelectedUsers((prev) => {
      return prev.filter((user) => user._id !== id);
    });
  }

  const { mutate } = useMutation(createGroupChat, {
    onSuccess: (data) => {
      setSearch("");
      setName("");
      setSelectedUsers([]);
      showToast({ type: "success", msg: "Group chat created" });
      queryClient.invalidateQueries("chats-list");
      socket.emit("create-group", data);
    },
    onError: (error: any) => {
      showToast({ type: "error", msg: error?.response?.data?.message });
    },
    onSettled: () => {
      setLoading(false);
      onClose();
    },
  });

  async function handleCreate() {
    if (!name || selectedUsers.length === 0) {
      showToast({ type: "error", msg: "Cannot create group chat" });
      return;
    }
    if (loading) return;

    setLoading(true);
    const ids: string[] = [];
    selectedUsers.forEach((user) => ids.push(user._id));
    mutate({
      groupName: name,
      users: ids,
      token,
    });
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Create new group</DialogTitle>
      <DialogContent sx={{ height: "100vh" }}>
        <TextField
          label="Group name"
          fullWidth
          margin="dense"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {selectedUsers.length > 0 && (
          <SelectedUsersList
            users={selectedUsers}
            handleDeselect={handleDeselect}
          />
        )}

        <Typography>Search users</Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
          <TextField
            fullWidth
            variant="standard"
            margin="dense"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setIsNew(true);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
          />
          <IconButton onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
        </Stack>

        {isLoading ? (
          <Stack alignItems="center">
            <CircularProgress />
          </Stack>
        ) : null}

        {isFetched && !isError ? (
          <UsersList users={data} handleSelect={handleSelect} />
        ) : null}

        {!isNew && search && data?.length === 0 ? (
          <Typography align="center">Users not found</Typography>
        ) : null}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button disabled={loading} variant="contained" onClick={handleCreate}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};
