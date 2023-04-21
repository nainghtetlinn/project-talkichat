import {
  Stack,
  Typography,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemButton,
} from "@mui/material";

import { ChatType } from "../../../../@types";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../../../../contexts/user";

type Props = { chat: ChatType };

export const GroupChatItem = ({ chat }: Props) => {
  const navigate = useNavigate();
  const { chatId: selectedChatId } = useParams();
  const { _id: loggedUserId } = useUserContext();
  const { latestMessage, _id: chatId, chatName, groupAdmin } = chat;

  return (
    <ListItem disableGutters>
      <ListItemButton
        selected={chatId === selectedChatId}
        onClick={() => {
          navigate("/chat/" + chatId);
        }}
      >
        <ListItemAvatar>
          <Avatar>{chatName[0]}</Avatar>
        </ListItemAvatar>

        <Stack sx={{ width: "100%", overflow: "hidden" }}>
          <Typography variant="body1">{chatName}</Typography>
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
                {latestMessage.sender.username}: {latestMessage.content}
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
