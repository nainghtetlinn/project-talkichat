import { Stack, Box, Avatar, Chip } from "@mui/material";

import { useRef, useEffect } from "react";
import { useQuery } from "react-query";
import { useUserContext } from "../../../contexts/user";

import { getAllMessages } from "../../../services/message";
import { isMe, isLastMessage } from "../utils";

type Props = { chatId: string };

export const ChatRoomBody = ({ chatId }: Props) => {
  const { token, _id: loggedUserId } = useUserContext();

  const chatBodyEl = useRef<HTMLDivElement | any>(null);

  const chatMessagesQuery = useQuery(
    ["messages", chatId],
    () => getAllMessages({ token, chatId }),
    {
      enabled: !!chatId && !!token,
    }
  );

  useEffect(() => {
    chatBodyEl.current.scrollTop = chatBodyEl.current.scrollHeight;
  }, [chatMessagesQuery.data]);

  return (
    <div ref={chatBodyEl} style={{ height: "100%", overflowY: "auto" }}>
      <Stack spacing={0.3} sx={{ py: 2 }}>
        {chatMessagesQuery.data?.map((m: any, i: number) => {
          return (
            <Box key={m._id}>
              {isMe(m.sender._id, loggedUserId) ? (
                <Stack direction="row" justifyContent="right">
                  <Chip label={m.content} />
                </Stack>
              ) : isLastMessage(chatMessagesQuery.data, i, loggedUserId) ? (
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="left"
                  spacing={0.5}
                >
                  <Avatar
                    alt={m.sender.username}
                    src={m.sender.avatar}
                    sx={{ height: 25, width: 25 }}
                  />
                  <Chip color="primary" label={m.content} />
                </Stack>
              ) : (
                <Stack direction="row" justifyContent="left" spacing={0.5}>
                  <Box
                    sx={{ display: "inline-block", width: 25, height: 25 }}
                  ></Box>
                  <Chip color="primary" label={m.content} />
                </Stack>
              )}
            </Box>
          );
        })}
      </Stack>
    </div>
  );
};
