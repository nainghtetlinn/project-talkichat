import SearchIcon from "@mui/icons-material/Search";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  TextField,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";
import { UserType } from "../../../../../@types";
import { AxiosError } from "axios";
import { SelectedUsersList } from "./SelectedUsersList";
import { UsersList } from "./UsersList";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { useUserContext } from "../../../../../contexts/user";
import { searchUser } from "../../../../../services/user";
import { addMember } from "../../../../../services/chat";

type Props = { open: boolean; onClose: () => void };

export const AddMembers = ({ open, onClose }: Props) => {
  const queryClient = useQueryClient();
  const { chatId } = useParams();
  const { token } = useUserContext();

  const [isNew, setIsNew] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [makeSearch, setMakeSearch] = useState(false);
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

  const { mutate, isLoading: loading } = useMutation(addMember, {
    onSuccess: (data) => {
      setKeyword("");
      setSelectedUsers([]);
      queryClient.invalidateQueries(["chatId", chatId]);
      onClose();
    },
    onError: (err: AxiosError) => {
      const res = err.response?.data as any;
      const msg = res.message || "Something went wrong";
      enqueueSnackbar(msg, { variant: "error" });
    },
  });

  const handleAdd = () => {
    if (selectedUsers.length === 0 || !chatId) {
      enqueueSnackbar("Cannot add member to group chat", { variant: "error" });
      return;
    }
    const ids: string[] = [];
    selectedUsers.forEach((user) => ids.push(user._id));
    mutate({ groupId: chatId, users: ids, token });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>
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
          variant="contained"
          sx={{ textTransform: "capitalize" }}
          endIcon={
            loading ? <CircularProgress size={20} color="inherit" /> : null
          }
          onClick={handleAdd}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};
