import LogoutIcon from "@mui/icons-material/Logout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import GroupIcon from "@mui/icons-material/Group";
import {
  Toolbar,
  Stack,
  IconButton,
  Typography,
  Drawer,
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  ListItemAvatar,
} from "@mui/material";
import { Profile } from "./Profile";
import { CreateGroupChat } from "./CreateGroupChat";
import { useState } from "react";
import { useUserContext } from "../../../../contexts/user";

type Props = { open: boolean; onClose: () => void };

export const SideDrawer = ({ open, onClose }: Props) => {
  const { removeUser, username, email, avatar } = useUserContext();

  const [showProfile, setShowProfile] = useState(false);
  const [createGroup, setCreateGroup] = useState(false);

  function handleLogout() {
    removeUser();
    localStorage.removeItem("token");
  }

  return (
    <>
      <Profile open={showProfile} onClose={() => setShowProfile(false)} />
      <CreateGroupChat
        open={createGroup}
        onClose={() => setCreateGroup(false)}
      />
      <Drawer anchor="left" open={open} onClose={onClose}>
        <Toolbar disableGutters>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ px: 1 }}>
            <IconButton onClick={onClose}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h5">TalkiChat</Typography>
          </Stack>
        </Toolbar>
        <List sx={{ minWidth: 300 }}>
          <ListItem>
            <ListItemButton onClick={() => setShowProfile(true)}>
              <ListItemAvatar>
                <Avatar alt={username} src={avatar}>
                  {username[0]}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={username} secondary={email} />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              onClick={() => {
                setCreateGroup(true);
                onClose();
              }}
            >
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary="Create Group Chat" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};
