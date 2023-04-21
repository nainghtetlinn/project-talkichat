import { List } from "@mui/material";
import { Fragment } from "react";
import { ChatItem } from "./ChatItem";
import { GroupChatItem } from "./GroupChatItem";
import { LoadingChatsList } from "./LoadingChatsList";

import { useQuery } from "react-query";
import { useUserContext } from "../../../../contexts/user";
import { fetchChats } from "../../../../services/chat";

export const ChatsList = () => {
  const { token } = useUserContext();

  const { data, isLoading } = useQuery("my-chats-list", () =>
    fetchChats(token)
  );
  return (
    <List>
      {!isLoading &&
        data?.map((chat) => {
          const isGroupChat = chat.isGroupChat;
          return (
            <Fragment key={chat._id}>
              {isGroupChat ? (
                <GroupChatItem chat={chat} />
              ) : (
                <ChatItem chat={chat} />
              )}
            </Fragment>
          );
        })}
      {isLoading ? <LoadingChatsList /> : null}
    </List>
  );
};
