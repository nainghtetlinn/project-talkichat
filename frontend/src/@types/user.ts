export interface UserType {
  username: string;
  email: string;
  avatar?: string;
  token: string;
  _id: string;
}

export interface UserContextType extends UserType {
  putUser: (user: UserType) => void;
  removeUser: () => void;
}
