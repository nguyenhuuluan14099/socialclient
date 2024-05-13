import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  process.env.NODE_ENV === "production"
    ? undefined
    : "https://endsocketne1.onrender.com/";
const url = `https://endsocketne1.onrender.com`;
export const socket = io(url, {
  autoConnect: false,
});
