import createServer from "@/loaders/server.ts";
import config from "@/config/app.config.ts";

(async () => {
  const server = createServer();
  server.listen(config.PORT, () => {
    console.log("Server started", config.PORT);
  });
})();
