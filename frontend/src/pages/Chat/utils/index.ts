export const isMe = (senderId: string, userId: string) => {
  return senderId === userId;
};

export const isLastMessage = (messages: any[], i: number, userId: string) => {
  const next = messages[i + 1];
  return (next && next.sender._id === userId) || !next;
};
