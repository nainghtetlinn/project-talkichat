import { createContext, useContext, useState } from "react";
import { UserType, UserContextType } from "../@types/user";

const DEFAULT_USER: UserType = {
  username: "",
  email: "",
  avatar: "",
  token: "",
  _id: "",
};

const userContext = createContext<UserContextType>({
  ...DEFAULT_USER,
  putUser: () => {},
  removeUser: () => {},
});

const UserContextProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<UserType>(DEFAULT_USER);

  function putUser({ username, email, avatar, _id, token }: UserType) {
    setUser({ username, email, avatar, _id, token });
    localStorage.setItem("token", token);
  }
  function removeUser() {
    setUser(DEFAULT_USER);
    localStorage.removeItem("token");
  }
  return (
    <userContext.Provider
      value={{
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        _id: user._id,
        token: user.token,
        putUser,
        removeUser,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

const useUserContext = () => useContext(userContext);

export { useUserContext, UserContextProvider };
