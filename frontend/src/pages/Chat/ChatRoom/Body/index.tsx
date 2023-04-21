import { Stack, Box, Chip } from "@mui/material";
import { Message } from "./Message";
import { MyMessage } from "./Message/MyMessage";
import { MessageType } from "../../../../@types";

import { useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useUserContext } from "../../../../contexts/user";
import { getAllMessages } from "../../../../services/message";
import { isFirstMessage, isLastMessage, isMe } from "./utils";

export const Body = () => {
  const { chatId } = useParams();
  const { token, _id: loggedUserId } = useUserContext();

  const chatBodyEl = useRef<HTMLDivElement | any>(null);

  const { data } = useQuery(
    ["messages", chatId],
    () => getAllMessages({ token, chatId: chatId as string }),
    {
      enabled: !!chatId && !!token,
    }
  );

  useEffect(() => {
    chatBodyEl.current?.scrollIntoView({ behavior: "smooth" });
  }, [data]);

  return (
    <div style={{ height: "100%", overflowY: "auto" }}>
      <Stack direction="column" spacing={0.3} sx={{ px: 2, py: 1 }}>
        {data?.map((m: MessageType, i: number) => {
          return (
            <Box ref={chatBodyEl} key={m._id}>
              {isMe(m.sender._id, loggedUserId) ? (
                <MyMessage message={m} />
              ) : (
                <Message
                  message={m}
                  isLast={isLastMessage(data, i)}
                  isFirst={isFirstMessage(data, i)}
                />
              )}
            </Box>
          );
        })}
      </Stack>
    </div>
  );
};
