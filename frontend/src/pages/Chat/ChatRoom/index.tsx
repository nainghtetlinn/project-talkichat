import { Stack } from "@mui/material";
import { LoadingChatRoom } from "./LoadingChatRoom";
import { ChatHeader } from "./Header/ChatHeader";
import { GroupChatHeader } from "./Header/GroupChatHeader";
import { Body } from "./Body";
import { Actions } from "./Actions";
import { ChatType } from "../../../@types";

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useUserContext } from "../../../contexts/user";
import { getChat } from "../../../services/chat";
import { socket } from "../../../services/socket";

export const ChatRoom = () => {
  const { chatId } = useParams();
  const { token } = useUserContext();

  useEffect(() => {
    if (!chatId) return;
    socket.emit("join-chat", chatId);
  }, [chatId]);

  const { data, isLoading } = useQuery(
    ["chatId", chatId],
    () => getChat({ token, chatId: chatId as string }),
    {
      enabled: !!token && !!chatId,
    }
  );

  return (
    <Stack direction="column" sx={{ height: "100%", overflow: "hidden" }}>
      {isLoading ? <LoadingChatRoom /> : null}
      {!isLoading && data && data?.isGroupChat ? (
        <GroupChatHeader chat={data as ChatType} />
      ) : null}
      {!isLoading && data && !data?.isGroupChat ? (
        <ChatHeader chat={data as ChatType} />
      ) : null}
      {!isLoading ? <Body /> : null}
      {!isLoading ? <Actions /> : null}
    </Stack>
  );
};
