import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Toolbar,
  Stack,
  Avatar,
  AvatarGroup,
  Divider,
  Typography,
  IconButton,
} from "@mui/material";
import { ChatType } from "../../../../@types";
import { GroupProfile } from "./GroupProfile";

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { shuffle } from "./utils";

type Props = { chat: ChatType };

export const GroupChatHeader = ({ chat }: Props) => {
  const navigate = useNavigate();
  const { chatName, users } = chat;
  const [show, setShow] = useState(false);

  const activeUsers = useMemo(() => {
    return users.filter((user) => user.isActive);
  }, [users]);

  const a = useMemo(() => {
    return shuffle(users);
  }, [users]);

  return (
    <>
      <GroupProfile
        open={show}
        onClose={() => setShow(false)}
        chat={chat}
        users={a}
      />
      <Toolbar>
        <Stack direction="row" alignItems="center" spacing={2}>
          <IconButton onClick={() => navigate("/chat")}>
            <ArrowBackIcon />
          </IconButton>

          <AvatarGroup max={3} spacing="small">
            {a.map((user) => {
              return (
                <Avatar key={user._id} alt={user.username} src={user.avatar}>
                  {user.username[0]}
                </Avatar>
              );
            })}
          </AvatarGroup>

          <Stack>
            <span onClick={() => setShow(true)}>
              <Typography
                variant="body1"
                sx={{
                  cursor: "pointer",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                {chatName}
              </Typography>
            </span>
            <Typography variant="body2">{activeUsers.length} online</Typography>
          </Stack>
        </Stack>
      </Toolbar>
      <Divider />
    </>
  );
};
