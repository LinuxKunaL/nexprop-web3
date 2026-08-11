import createServer from "@/loaders/server.ts";
import config from "@/config/app.config.ts";
import { startBlockchainListeners } from "./loaders/blockchain.ts";

(async () => {
  const server = createServer();
  startBlockchainListeners();
  server.listen(config.PORT, "0.0.0.0", () => {
    console.log("Server started", config.PORT);
  });
})();
