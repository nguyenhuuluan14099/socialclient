import { useEffect } from "react";
import { useState } from "react";
import { io } from "socket.io-client";

export default function useSocket() {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    setSocket(io("ws://localhost:8900"));
  }, []);
  return {
    socket,
  };
}
