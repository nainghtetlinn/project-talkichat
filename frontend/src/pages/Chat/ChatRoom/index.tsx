import { Stack } from "@mui/material";
import { LoadingChatRoom } from "./LoadingChatRoom";
import { ChatHeader } from "./Header/ChatHeader";
import { GroupChatHeader } from "./Header/GroupChatHeader";
import { Body } from "./Body";
import { Actions } from "./Actions";
import { ChatType } from "../../../@types";
import { AxiosError } from "axios";

import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { enqueueSnackbar } from "notistack";
import { useUserContext } from "../../../contexts/user";
import { useSocketContext } from "../../../contexts/socket";
import { getChat } from "../../../services/chat";

export const ChatRoom = () => {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const { token } = useUserContext();
  const { socket } = useSocketContext();

  useEffect(() => {
    if (!chatId || !socket) return;
    socket.emit("join-chat", chatId);
  }, [chatId, socket]);

  const { data, isLoading } = useQuery(
    ["chatId", chatId],
    () => getChat({ token, chatId: chatId as string }),
    {
      enabled: !!token && !!chatId,
      onError: (err: AxiosError) => {
        const res = err.response?.data as any;
        const msg = res.message || "Something went wrong";
        enqueueSnackbar(msg, { variant: "error" });
        navigate("/chat");
      },
    }
  );

  function handleBack() {
    if (!socket || !chatId) return;
    navigate("/chat");
    socket.emit("leave-chat", chatId);
  }

  return (
    <Stack direction="column" sx={{ height: "100%", overflow: "hidden" }}>
      {isLoading ? <LoadingChatRoom /> : null}
      {!isLoading && data && data?.isGroupChat ? (
        <GroupChatHeader chat={data as ChatType} handleBack={handleBack} />
      ) : null}
      {!isLoading && data && !data?.isGroupChat ? (
        <ChatHeader chat={data as ChatType} handleBack={handleBack} />
      ) : null}
      {!isLoading ? <Body /> : null}
      {!isLoading ? <Actions /> : null}
    </Stack>
  );
};
