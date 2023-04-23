import axios from "axios";
import { ChatType } from "../@types";

const baseUrl = import.meta.env.VITE_BACKEND_SERVER;

const chat = axios.create({
  baseURL: baseUrl + "/api/chat",
});

const accessChat = async ({
  userId,
  token,
}: {
  userId: string;
  token: string;
}) => {
  const { data } = await chat.post(
    "/",
    { userId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return data as ChatType;
};

const getChat = async ({
  chatId,
  token,
}: {
  token: string;
  chatId: string;
}) => {
  const { data } = await chat.get(`/${chatId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data as ChatType;
};

const fetchChats = async (token: string) => {
  const { data } = await chat.get("/", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data as ChatType[];
};

const createGroupChat = async ({
  token,
  groupName,
  users,
}: {
  token: string;
  groupName: string;
  users: string[];
}) => {
  const { data } = await chat.post(
    "/group",
    { groupName, users },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return data as ChatType[];
};

const renameGroupChat = async ({
  token,
  groupName,
  groupId,
}: {
  token: string;
  groupName: string;
  groupId: string;
}) => {
  const { data } = await chat.put(
    "/group/rename",
    { groupName, groupId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return data as ChatType;
};

const addMember = async ({
  users,
  groupId,
  token,
}: {
  token: string;
  groupId: string;
  users: string[];
}) => {
  const { data } = await chat.put(
    "/group/add",
    { groupId, users },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return data as ChatType;
};

const removeMember = async ({
  token,
  groupId,
  users,
}: {
  token: string;
  users: string[];
  groupId: string;
}) => {
  const { data } = await chat.put(
    "/group/remove",
    { groupId, users },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return data as ChatType;
};

export {
  accessChat,
  getChat,
  fetchChats,
  createGroupChat,
  renameGroupChat,
  addMember,
  removeMember,
};
