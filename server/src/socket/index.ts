import { Server } from "socket.io";
import { type Server as HttpServer } from "http";
import registerConnection from "./connection.js";

export default function (server: HttpServer): Server {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  registerConnection(io);

  return io;
}
