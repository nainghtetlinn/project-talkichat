import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {
  Typography,
  Collapse,
  Divider,
  IconButton,
  Stack,
  Box,
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import { UserType } from "../../../../@types";

type Props = { users: UserType[]; handleDeselect: (id: string) => void };

export const SelectedUsersList = ({ users, handleDeselect }: Props) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Typography>Selected users: {users.length}</Typography>
        <IconButton onClick={handleClick}>
          {open ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </Stack>
      <Collapse in={open} timeout="auto">
        <List>
          {users.map((user) => {
            return (
              <ListItem key={user._id}>
                <ListItemButton onClick={() => handleDeselect(user._id)}>
                  <ListItemAvatar>
                    <Avatar alt={user.username} src={user.avatar}>
                      {user.username[0]}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={user.username}
                    secondary={user.email}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Collapse>
      <Divider />
    </Box>
  );
};
