import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Input,
  Typography,
  Stack,
  CircularProgress,
} from "@mui/material";
import { UsersList } from "./UsersList";

import { useState } from "react";
import { useQuery } from "react-query";
import { useToastContext } from "../contexts/toast";
import { useUserContext } from "../contexts/user";
import { searchUser } from "../services/user";

type Props = { open: boolean; onClose: () => void };

export const SearchUser = ({ open, onClose }: Props) => {
  const { showToast } = useToastContext();
  const { token } = useUserContext();
  const [search, setSearch] = useState("");
  const [isNew, setIsNew] = useState(true);
  const [startSearch, setStartSearch] = useState(false);

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

  async function handleSearch() {
    if (search !== "") {
      setStartSearch(true);
    }
  }

  if (isError)
    showToast({
      type: "error",
      msg: "Something went wrong",
    });

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle sx={{ display: "flex", alignItems: "center", p: 2 }}>
        <IconButton onClick={onClose}>
          <ArrowBackIcon />
        </IconButton>
        <Input
          fullWidth
          sx={{ mx: 1 }}
          placeholder="Search..."
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
      </DialogTitle>
      <DialogContent sx={{ height: "100vh" }}>
        {isLoading ? (
          <Stack alignItems="center">
            <CircularProgress />
          </Stack>
        ) : null}
        {isFetched && !isError ? (
          <UsersList users={data || []} onClose={onClose} />
        ) : null}
        {!isNew && search && data?.length === 0 ? (
          <Typography align="center">Users not found</Typography>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};
