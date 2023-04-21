import axios from "axios";
import { LoggedUserType } from "../@types/user";

const baseUrl = import.meta.env.PROD
  ? import.meta.env.VITE_PRODUCTION_SERVER
  : import.meta.env.VITE_DEVELOPMENT_SERVER;

const User = axios.create({
  baseURL: baseUrl + "/api/user",
});

const signup = async ({
  username,
  email,
  password,
  avatar,
}: {
  username: string;
  email: string;
  password: string;
  avatar: any;
}) => {
  const formdata = new FormData();
  formdata.append("email", email);
  formdata.append("password", password);
  formdata.append("username", username);
  formdata.append("avatar", avatar);
  const { data } = await User.post("/register", formdata, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data as LoggedUserType;
};

const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const { data } = await User.post("/login", { email, password });
  return data as LoggedUserType;
};

const loginWithToken = async (token: string) => {
  const { data } = await User.get("/token", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data as LoggedUserType;
};

const updateUser = async ({
  username,
  avatarFile,
  token,
}: {
  username: string;
  avatarFile: any;
  token: string;
}) => {
  const formdata = new FormData();
  formdata.append("username", username);
  formdata.append("avatar", avatarFile);
  const { data } = await User.put("/update", formdata, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return data as LoggedUserType;
};

const searchUser = async ({
  search,
  token,
}: {
  search: string;
  token: string;
}) => {
  const { data } = await User.get("/", {
    params: { search },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export { signup, login, loginWithToken, updateUser, searchUser };
