import {
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
} from "@mui/material";
import { ActiveBadge } from "../../../components";

import { ChatType } from "../../../@types";
import { useParams, useNavigate } from "react-router-dom";
import { useUserContext } from "../../../contexts/user";
import { socket } from "../../../services/socket";

type Props = {
  chatItem: ChatType;
};

export const ChatItem = ({ chatItem }: Props) => {
  const navigate = useNavigate();
  const { chatId } = useParams();
  const { _id: loggedUserId, token } = useUserContext();

  const { _id, isGroupChat, chatName, unreadMessages, users } = chatItem;
  const peekMsg =
    unreadMessages && unreadMessages.sender._id !== loggedUserId
      ? unreadMessages?.content
      : null;

  const user = users.filter((user) => user._id !== loggedUserId)[0];

  return (
    <ListItemButton
      selected={chatId === _id}
      key={_id}
      onClick={() => {
        navigate(`/chat/${_id}`);
      }}
    >
      {isGroupChat ? (
        <>
          <ListItemAvatar>
            <Avatar alt={chatName}>{chatName[0]}</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={chatName}
            secondary={<Typography variant="subtitle2">{peekMsg}</Typography>}
          />
        </>
      ) : (
        <>
          <ListItemAvatar>
            <ActiveBadge isActive={user.isActive}>
              <Avatar alt={user.username} src={user.avatar} />
            </ActiveBadge>
          </ListItemAvatar>
          <ListItemText
            primary={user.username}
            secondary={<Typography variant="subtitle2">{peekMsg}</Typography>}
          />
        </>
      )}
    </ListItemButton>
  );
};
