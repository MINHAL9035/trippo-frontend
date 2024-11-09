import { io, Socket } from "socket.io-client";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const socket: Socket = io(BACKEND_URL, {
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  timeout: 10000,
});
export default socket;
