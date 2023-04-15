import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  AppBar,
  Toolbar,
  Container,
  Typography,
  Stack,
  Button,
  IconButton,
  Tooltip,
  Avatar,
  Link,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import { Profile } from "./Profile";
import { SearchUser } from "./SearchUser";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useUserContext } from "../contexts/user";

export const Header = () => {
  const navigate = useNavigate();
  const { username, avatar, email, token, removeUser } = useUserContext();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [openProfile, setOpenProfile] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  function handleClose() {
    setAnchorEl(null);
  }

  function handleLogout() {
    handleClose();
    removeUser();
    localStorage.removeItem("token");
  }

  return (
    <>
      <AppBar position="relative">
        <Toolbar disableGutters>
          <Container maxWidth="lg">
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="h5" sx={{ cursor: "pointer" }}>
                <Link
                  color="inherit"
                  underline="hover"
                  onClick={() => navigate(!username ? "/" : "/chat")}
                >
                  TalkiChat
                </Link>
              </Typography>
              <Stack direction="row" alignItems="center" spacing={1}>
                {username ? (
                  <>
                    <IconButton
                      color="inherit"
                      onClick={() => setOpenSearch(true)}
                    >
                      <SearchIcon />
                    </IconButton>
                    <Tooltip title="Account Setting">
                      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                        <Avatar
                          alt={username}
                          src={avatar}
                          sx={{ width: 32, height: 32 }}
                        />
                      </IconButton>
                    </Tooltip>
                  </>
                ) : (
                  <>
                    <Button
                      size="small"
                      color="inherit"
                      sx={{ textTransform: "capitalize", fontSize: 16 }}
                      onClick={() => navigate("/signup")}
                    >
                      Signup
                    </Button>
                    <Button
                      size="small"
                      color="inherit"
                      sx={{ textTransform: "capitalize", fontSize: 16 }}
                      onClick={() => navigate("/login")}
                    >
                      Login
                    </Button>
                  </>
                )}
              </Stack>
            </Stack>
          </Container>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <MenuItem
          onClick={() => {
            setOpenProfile(true);
            setAnchorEl(null);
          }}
        >
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <Profile
        open={openProfile}
        onClose={() => setOpenProfile(false)}
        username={username}
        email={email}
        avatar={avatar}
      />
      <SearchUser open={openSearch} onClose={() => setOpenSearch(false)} />
    </>
  );
};
