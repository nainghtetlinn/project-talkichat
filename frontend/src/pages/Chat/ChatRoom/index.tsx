import { Stack, CircularProgress, Divider } from "@mui/material";
import { ChatRoomHeaderGroup } from "./ChatRoomHeaderGroup";
import { ChatRoomHeader } from "./ChatRoomHeader";
import { ChatRoomBody } from "./ChatRoomBody";
import { ChatRoomAction } from "./ChatRoomAction";

import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useUserContext } from "../../../contexts/user";
import { getChat } from "../../../services/chat";

export const ChatRoom = () => {
  const { chatId } = useParams();
  const { token, _id: loggedUserId } = useUserContext();

  const chatDataQuery = useQuery(
    ["chat-data", chatId],
    () => getChat({ token, chatId: chatId as string }),
    {
      enabled: !!chatId && !!token,
      select: (data) => {
        return {
          ...data,
          chatingUser: data.users.filter(
            (user: any) => user._id !== loggedUserId
          )[0],
        };
      },
    }
  );

  return (
    <Stack
      direction="column"
      sx={{
        height: "100%",
        overflow: "hidden",
        ml: { md: 2 },
      }}
    >
      {chatDataQuery.isLoading ? (
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{ height: "100%" }}
        >
          <CircularProgress />
        </Stack>
      ) : null}

      {!chatDataQuery.isLoading && chatDataQuery.data ? (
        <>
          {chatDataQuery.data.isGroupChat ? (
            <ChatRoomHeaderGroup
              name={chatDataQuery.data.chatName}
              users={chatDataQuery.data.users}
            />
          ) : (
            <ChatRoomHeader
              name={chatDataQuery.data.chatingUser.username}
              email={chatDataQuery.data.chatingUser.email}
              avatar={chatDataQuery.data.chatingUser.avatar}
              isActive={chatDataQuery.data.chatingUser.isActive || false}
            />
          )}
          <Divider />
          <ChatRoomBody chatId={chatId as string} />
          <ChatRoomAction chatId={chatId as string} />
        </>
      ) : null}
    </Stack>
  );
};
