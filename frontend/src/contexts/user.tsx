import { createContext, useContext, useState, useLayoutEffect } from "react";
import { LoggedUserType, UserContextType } from "../@types/user";
import { loginWithToken } from "../services/user";

const DEFAULT_USER: LoggedUserType = {
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

const token = localStorage.getItem("token") || "";

const UserContextProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<LoggedUserType>({
    ...DEFAULT_USER,
    token: token,
  });

  function putUser({ username, email, avatar, _id, token }: LoggedUserType) {
    setUser({ username, email, avatar, _id, token });
    localStorage.setItem("token", token);
  }
  function removeUser() {
    setUser(DEFAULT_USER);
    localStorage.removeItem("token");
  }

  useLayoutEffect(() => {
    if (token) {
      loginWithToken(token)
        .then((data) => putUser(data))
        .catch((err) => {
          removeUser();
        });
    }
  }, []);

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
