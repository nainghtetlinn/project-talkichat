import SearchIcon from "@mui/icons-material/Search";
import {
  Stack,
  Typography,
  IconButton,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import { UsersList } from "./UsersList";
import { SelectedUsersList } from "./SelectedUsersList";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { enqueueSnackbar } from "notistack";
import { useUserContext } from "../../../../contexts/user";
import { searchUser } from "../../../../services/user";
import { createGroupChat } from "../../../../services/chat";
import { ChatType, UserType } from "../../../../@types";
import { AxiosError } from "axios";

type Props = { open: boolean; onClose: () => void };

export const CreateGroupChat = ({ open, onClose }: Props) => {
  const queryClient = useQueryClient();
  const { token } = useUserContext();

  const [loading, setLoading] = useState(false);
  const [isNew, setIsNew] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [makeSearch, setMakeSearch] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<UserType[]>([]);

  const { data, isLoading } = useQuery(
    "Search",
    () => searchUser({ token, search: keyword }),
    {
      enabled: makeSearch && !!token,
      onSettled: () => {
        setIsNew(false);
        setMakeSearch(false);
      },
    }
  );

  function handleSearch() {
    if (keyword !== "") {
      setMakeSearch(true);
      setIsNew(true);
    }
  }

  function handleSelect(user: UserType) {
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
      setKeyword("");
      setGroupName("");
      setSelectedUsers([]);
      enqueueSnackbar("Group chat created", { variant: "success" });
      queryClient.invalidateQueries("my-chats-list");
      onClose();
    },
    onError: (err: AxiosError) => {
      const res = err.response?.data as any;
      const msg = res.message || "Something went wrong";
      enqueueSnackbar(msg, { variant: "error" });
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  function handleCreate() {
    if (!groupName || selectedUsers.length === 0) {
      enqueueSnackbar("Cannot create group chat", { variant: "error" });
      return;
    }
    setLoading(true);
    const ids: string[] = [];
    selectedUsers.forEach((user) => ids.push(user._id));
    mutate({
      groupName,
      users: ids,
      token,
    });
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>
        <TextField
          fullWidth
          margin="dense"
          type="text"
          label="group name"
          value={groupName}
          onChange={(e) => {
            setGroupName(e.target.value);
          }}
        />
        <Stack direction="row" alignItems="center">
          <TextField
            fullWidth
            margin="dense"
            type="text"
            variant="standard"
            placeholder="Search user"
            autoFocus
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
              setIsNew(true);
            }}
            onKeyDown={(e) => {
              if (e.key !== "Enter") return;
              handleSearch();
            }}
          />
          <IconButton onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent sx={{ height: "100vh", overflow: "auto" }}>
        {selectedUsers.length > 0 && (
          <SelectedUsersList
            users={selectedUsers}
            handleDeselect={handleDeselect}
          />
        )}
        {isLoading ? (
          <Stack alignItems="center">
            <CircularProgress />
          </Stack>
        ) : null}
        {!isLoading || !!data ? (
          <UsersList users={data || []} handleSelect={handleSelect} />
        ) : null}
        {!isNew && data?.length === 0 ? (
          <Typography align="center">No user found</Typography>
        ) : null}
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
          disabled={loading}
          variant="contained"
          sx={{ textTransform: "capitalize" }}
          endIcon={
            loading ? <CircularProgress size={20} color="inherit" /> : null
          }
          onClick={handleCreate}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};
