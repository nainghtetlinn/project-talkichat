import {
  Stack,
  Typography,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemButton,
} from "@mui/material";
import { ActiveBadge } from "../../../../components";
import { ChatType } from "../../../../@types";

import moment from "moment";
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../../../../contexts/user";

type Props = { chat: ChatType };

export const ChatItem = ({ chat }: Props) => {
  const navigate = useNavigate();
  const { chatId: selectedChatId } = useParams();
  const { _id: loggedUserId } = useUserContext();
  const { latestMessage, users, _id: chatId } = chat;
  const user = useMemo(() => {
    return users.filter((user) => user._id !== loggedUserId)[0];
  }, [users, loggedUserId]);

  return (
    <ListItem disableGutters>
      <ListItemButton
        selected={chatId === selectedChatId}
        onClick={() => {
          navigate("/chat/" + chatId);
        }}
      >
        <ListItemAvatar>
          <ActiveBadge isActive={user.isActive}>
            <Avatar alt={user.username} src={user.avatar}>
              {user.username[0]}
            </Avatar>
          </ActiveBadge>
        </ListItemAvatar>
        <Stack sx={{ width: "100%", overflow: "hidden" }}>
          <Typography variant="body1">{user.username}</Typography>
          {latestMessage && latestMessage.sender._id !== loggedUserId ? (
            <Stack
              direction="row"
              alignItems="center"
              flexWrap="wrap"
              sx={{ width: "100%", overflow: "hidden" }}
            >
              <Typography
                variant="subtitle2"
                component="span"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
                sx={{ mr: 1 }}
              >
                {latestMessage.content}
              </Typography>
              <Typography variant="caption">
                {moment(latestMessage.createdAt).fromNow()}
              </Typography>
            </Stack>
          ) : null}
        </Stack>
      </ListItemButton>
    </ListItem>
  );
};
