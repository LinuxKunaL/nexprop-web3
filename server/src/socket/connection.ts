import type { Server } from "socket.io";
import joinUserRoom from "./room.js";

export default function (io: Server) {
  io.on("connection", async (socket) => {
    await joinUserRoom(socket);

    console.log("Socket connected: ", socket.id);

    socket.on("disconnect", () => {
      console.log("Socket disconnected: ", socket.id);
    });
  });
}
