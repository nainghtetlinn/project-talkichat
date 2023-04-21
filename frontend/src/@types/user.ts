export interface LoggedUserType {
  username: string;
  email: string;
  avatar?: string;
  _id: string;
  token: string;
}

export interface UserContextType extends LoggedUserType {
  putUser: (user: LoggedUserType) => void;
  removeUser: () => void;
}
