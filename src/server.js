import { createApp } from "./app.js";
import { config } from "./config.js";
import { logger } from "./logger.js";

const server = createApp().listen(config.PORT, () => {
  logger.info({ port: config.PORT, environment: config.NODE_ENV }, "API listening");
});
let shuttingDown = false;

function shutdown(signal) {
  if (shuttingDown) return;
  shuttingDown = true;
  logger.info({ signal }, "Graceful shutdown started");
  const timeout = setTimeout(() => {
    logger.error("Graceful shutdown timed out");
    process.exit(1);
  }, config.SHUTDOWN_TIMEOUT_MS).unref();
  server.close((error) => {
    clearTimeout(timeout);
    if (error) {
      logger.error({ err: error }, "Server close failed");
      process.exit(1);
    }
    logger.info("Graceful shutdown complete");
    process.exit(0);
  });
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
