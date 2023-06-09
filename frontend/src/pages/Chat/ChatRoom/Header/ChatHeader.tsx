import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Toolbar,
  Stack,
  Avatar,
  Divider,
  Typography,
  IconButton,
} from "@mui/material";
import { Profile } from "./Profile";
import { ActiveBadge } from "../../../../components";
import { ChatType } from "../../../../@types";

import moment from "moment";
import { useMemo, useState } from "react";
import { useUserContext } from "../../../../contexts/user";

type Props = { chat: ChatType; handleBack: () => void };

export const ChatHeader = ({ chat, handleBack }: Props) => {
  const { _id } = useUserContext();
  const { users } = chat;

  const [show, setShow] = useState(false);

  const user = useMemo(() => {
    return users.filter((user) => user._id !== _id)[0];
  }, [users, _id]);

  return (
    <>
      <Profile open={show} onClose={() => setShow(false)} user={user} />
      <Toolbar>
        <Stack direction="row" alignItems="center" spacing={2}>
          <IconButton onClick={handleBack}>
            <ArrowBackIcon />
          </IconButton>
          <ActiveBadge isActive={user.isActive}>
            <Avatar alt={user.username} src={user.avatar}>
              {user.username[0]}
            </Avatar>
          </ActiveBadge>
          <Stack>
            <span onClick={() => setShow(true)}>
              <Typography
                variant="body1"
                sx={{
                  cursor: "pointer",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                {user.username}
              </Typography>
            </span>
            <Typography variant="body2">
              {user.isActive
                ? "online"
                : "online " + moment(user?.updatedAt).fromNow()}
            </Typography>
          </Stack>
        </Stack>
      </Toolbar>
      <Divider />
    </>
  );
};
