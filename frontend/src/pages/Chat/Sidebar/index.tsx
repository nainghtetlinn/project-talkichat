import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Stack,
  Toolbar,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import { SideDrawer } from "./SideDrawer";
import { Search } from "./Search";
import { ChatsList } from "./ChatsList";
import { useState } from "react";

export const Sidebar = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  return (
    <>
      <SideDrawer open={showDrawer} onClose={() => setShowDrawer(false)} />
      <Search open={showSearch} onClose={() => setShowSearch(false)} />
      <Box sx={{ height: "100%", overflow: "hidden" }}>
        <Toolbar disableGutters>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ width: "100%", px: 1 }}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconButton onClick={() => setShowDrawer(true)}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h5">TalkiChat</Typography>
            </Stack>
            <IconButton onClick={() => setShowSearch(true)}>
              <SearchIcon />
            </IconButton>
          </Stack>
        </Toolbar>
        <Divider />
        <ChatsList />
      </Box>
    </>
  );
};
