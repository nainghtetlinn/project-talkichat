import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Stack, IconButton, Avatar, Typography } from "@mui/material";
import { ActiveBadge, Profile } from "../../../components";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  name: string;
  email: string;
  avatar: string;
  isActive: boolean;
};

export const ChatRoomHeader = ({ name, email, avatar, isActive }: Props) => {
  const navigate = useNavigate();
  const [openProfile, setOpenProfile] = useState(false);

  return (
    <>
      <Stack sx={{ py: 2 }} direction="row" alignItems="center" spacing={2}>
        <IconButton onClick={() => navigate("/chat")}>
          <ArrowBackIosIcon />
        </IconButton>

        <ActiveBadge isActive={isActive}>
          <Avatar alt={name} src={avatar} />
        </ActiveBadge>

        <Stack>
          <Typography sx={{ cursor: "pointer" }}>
            <span onClick={() => setOpenProfile(true)}>{name}</span>
          </Typography>
          <Typography variant="body2">{isActive ? "Online" : null}</Typography>
        </Stack>
      </Stack>
      <Profile
        open={openProfile}
        onClose={() => setOpenProfile(false)}
        username={name}
        email={email}
        avatar={avatar}
      />
    </>
  );
};
