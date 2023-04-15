import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {
  List,
  ListItemAvatar,
  ListItemText,
  ListItemButton,
  Avatar,
  Typography,
  Collapse,
  IconButton,
  Stack,
  Box,
} from "@mui/material";
import { useState } from "react";

import { UserType } from "../../../@types/user";

type Props = { users: UserType[]; handleDeselect: (id: string) => void };

export const SelectedUsersList = ({ users, handleDeselect }: Props) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ my: 2 }}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Typography>Selected users: {users.length}</Typography>
        <IconButton onClick={handleClick}>
          {open ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </Stack>

      <Collapse in={open} timeout="auto">
        <List>
          {users.map((user) => {
            const { _id, username, avatar, email } = user;
            return (
              <ListItemButton key={_id} onClick={() => handleDeselect(_id)}>
                <ListItemAvatar>
                  <Avatar alt={username} src={avatar} />
                </ListItemAvatar>
                <ListItemText primary={username} secondary={email} />
              </ListItemButton>
            );
          })}
        </List>
      </Collapse>
    </Box>
  );
};
