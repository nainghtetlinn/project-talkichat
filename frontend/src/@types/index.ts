interface UserType {
  _id: string;
  username: string;
  avatar: string;
  email: string;
  isActive: boolean;
}

export interface ChatType {
  _id: string;
  chatName: string;
  isGroupChat: boolean;
  users: UserType[];
  unreadMessages: MessageType;
  groupAdmin: UserType;
}

export interface MessageType {
  _id: string;
  sender: UserType;
  content: string;
  chat: ChatType;
}
