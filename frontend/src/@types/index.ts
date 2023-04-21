export interface UserType {
  _id: string;
  username: string;
  avatar: string;
  email: string;
  isActive: boolean;
  updatedAt?: any;
  createdAt?: any;
}

export interface ChatType {
  _id: string;
  chatName: string;
  isGroupChat: boolean;
  users: UserType[];
  latestMessage: MessageType;
  groupAdmin: UserType;
  updatedAt?: any;
  createdAt?: any;
}

export interface MessageType {
  _id: string;
  sender: UserType;
  content: string;
  chat: ChatType;
  updatedAt?: any;
  createdAt?: any;
}
