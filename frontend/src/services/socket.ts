import io from "socket.io-client";

const ENDPOINT = import.meta.env.PROD
  ? import.meta.env.VITE_PRODUCTION_SERVER
  : import.meta.env.VITE_DEVELOPMENT_SERVER;

let socket = io(ENDPOINT);

export { socket };
