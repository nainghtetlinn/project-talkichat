import { List } from "@mui/material";
import { LoadingChatsList } from "./LoadingChatsList";
import { ChatItem } from "./ChatItem";

import { ChatType } from "../../../@types";
import { useQuery } from "react-query";
import { fetchChats } from "../../../services/chat";
import { useUserContext } from "../../../contexts/user";

export const ChatsList = () => {
  const { token } = useUserContext();

  const { data, isLoading } = useQuery(
    ["chats-list"],
    () => fetchChats(token),
    {
      enabled: !!token,
    }
  );

  return (
    <List sx={{ height: "100%", overflowY: "auto" }}>
      {isLoading ? <LoadingChatsList /> : null}

      {!isLoading
        ? data?.map((chat: ChatType) => {
            return <ChatItem key={chat._id} chatItem={chat} />;
          })
        : null}
    </List>
  );
};
