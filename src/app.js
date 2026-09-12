import crypto from "node:crypto";
import express from "express";
import helmet from "helmet";
import pinoHttp from "pino-http";
import { config } from "./config.js";
import { errorHandler, notFoundHandler } from "./errors.js";
import { logger } from "./logger.js";
import { healthRouter } from "./routes/health.js";
import { v1Router } from "./routes/v1.js";

export function createApp() {
  const app = express();
  app.disable("x-powered-by");
  app.set("trust proxy", config.TRUST_PROXY);
  app.use(helmet());
  app.use(express.json({ limit: "100kb" }));
  app.use(pinoHttp({
    logger,
    genReqId: (req, res) => {
      const requestId = req.headers["x-request-id"] || crypto.randomUUID();
      res.setHeader("x-request-id", requestId);
      return requestId;
    },
  }));
  app.use("/health", healthRouter);
  app.use("/api/v1", v1Router);
  app.use(notFoundHandler);
  app.use(errorHandler);
  return app;
}
