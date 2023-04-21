import { MessageType } from "../../../../@types";

export const isMe = (senderId: string, userId: string) => {
  return senderId === userId;
};

export const isLastMessage = (messages: MessageType[], i: number) => {
  const current = messages[i];
  const next = messages[i + 1];
  return (next && next.sender._id !== current.sender._id) || !next;
};

export const isFirstMessage = (messages: MessageType[], i: number) => {
  if (i === 0) return true;
  const prev = messages[i - 1];
  const current = messages[i];
  return prev.sender._id !== current.sender._id;
};
