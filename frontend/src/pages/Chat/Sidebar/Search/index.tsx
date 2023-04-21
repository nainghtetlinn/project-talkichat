import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import {
  Typography,
  TextField,
  IconButton,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  CircularProgress,
} from "@mui/material";
import { UsersList } from "./UsersList";
import { useState } from "react";
import { useQuery } from "react-query";
import { useUserContext } from "../../../../contexts/user";
import { searchUser } from "../../../../services/user";

type Props = {
  open: boolean;
  onClose: () => void;
};

export const Search = ({ open, onClose }: Props) => {
  const { token } = useUserContext();
  const [isNew, setIsNew] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [makeSearch, setMakeSearch] = useState(false);

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

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle sx={{ px: 1 }}>
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <IconButton onClick={onClose}>
            <ArrowBackIcon />
          </IconButton>
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
        {isLoading ? (
          <Stack alignItems="center">
            <CircularProgress />
          </Stack>
        ) : null}
        {!isLoading || !!data ? (
          <UsersList users={data || []} onClose={onClose} />
        ) : null}
        {!isNew && data?.length === 0 ? (
          <Typography align="center">No user found</Typography>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};
