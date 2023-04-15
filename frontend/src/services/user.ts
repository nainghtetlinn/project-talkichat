import axios from "axios";
import { UserType } from "../@types/user";

const baseUrl = import.meta.env.PROD
  ? import.meta.env.VITE_PRODUCTION_SERVER
  : import.meta.env.VITE_DEVELOPMENT_SERVER;

const user = axios.create({
  baseURL: baseUrl + "/api/user",
});

const signup = async ({
  username,
  email,
  password,
  avatarFile,
}: {
  username: string;
  email: string;
  password: string;
  avatarFile: any;
}) => {
  const formdata = new FormData();
  formdata.append("email", email);
  formdata.append("password", password);
  formdata.append("username", username);
  formdata.append("avatar", avatarFile);
  const { data } = await user.post("/register", formdata, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data as UserType;
};

const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const { data } = await user.post("/login", { email, password });
  return data as UserType;
};

const loginWithToken = async (token: string) => {
  const { data } = await user.get("/token", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data as UserType;
};

const changeUsername = async ({
  username,
  token,
}: {
  username: string;
  token: string;
}) => {
  const { data } = await user.put(
    "/change/username",
    { username },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return data as UserType;
};

const changeAvatar = async ({
  avatarFile,
  token,
}: {
  avatarFile: any;
  token: string;
}) => {
  const { data } = await user.put(
    "/change/avatar",
    { avatar: avatarFile },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data as UserType;
};

const searchUser = async ({
  search,
  token,
}: {
  search: string;
  token: string;
}) => {
  const { data } = await user.get("/", {
    params: { search },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export {
  signup,
  login,
  loginWithToken,
  changeUsername,
  changeAvatar,
  searchUser,
};
