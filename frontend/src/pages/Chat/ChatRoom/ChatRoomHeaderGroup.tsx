import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Stack, IconButton, Avatar, Typography } from "@mui/material";
import { GroupProfile } from "./GroupProfile";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = { name: string; users: any[] };

export const ChatRoomHeaderGroup = ({ name, users }: Props) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Stack sx={{ py: 2 }} direction="row" alignItems="center" spacing={2}>
        <IconButton onClick={() => navigate("/chat")}>
          <ArrowBackIosIcon />
        </IconButton>

        <Avatar alt={name}>{name[0]}</Avatar>

        <Stack>
          <Typography sx={{ cursor: "pointer" }}>
            <span onClick={() => setOpen(true)}>{name}</span>
          </Typography>
          <Typography variant="body2">{users.length} members</Typography>
        </Stack>
      </Stack>
      <GroupProfile
        open={open}
        onClose={() => setOpen(false)}
        chatName={name}
        users={users}
      />
    </>
  );
};
