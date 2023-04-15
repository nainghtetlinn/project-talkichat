import axios from "axios";
import { MessageType } from "../@types";

const baseUrl = import.meta.env.PROD
  ? import.meta.env.VITE_PRODUCTION_SERVER
  : import.meta.env.VITE_DEVELOPMENT_SERVER;

const message = axios.create({
  baseURL: baseUrl + "/api/message",
});

const sendMessage = async ({
  token,
  chatId,
  content,
}: {
  token: string;
  chatId: string;
  content: string;
}) => {
  const { data } = await message.post(
    `/${chatId}`,
    { content },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return data as MessageType;
};

const getAllMessages = async ({
  token,
  chatId,
}: {
  token: string;
  chatId: string;
}) => {
  const { data } = await message.get(`/${chatId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data as MessageType[];
};
export { sendMessage, getAllMessages };
