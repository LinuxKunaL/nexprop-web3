import type { Socket } from "socket.io";

export default async function (socket: Socket) {
  socket.join("");
  console.log("user joind room");
}
