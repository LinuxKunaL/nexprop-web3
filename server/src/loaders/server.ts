import http, { type Server } from "http";
import initExpress from "./express.ts";
import initSocket from "./socket.ts"

export default function (): Server {
  const app = initExpress();
  const server = http.createServer(app);

  initSocket(server);

  return server;
}
