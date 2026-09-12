import { Router } from "express";
import { z } from "zod";
import { AppError } from "../errors.js";

const echoSchema = z.object({ message: z.string().trim().min(1).max(200) });
export const v1Router = Router();

v1Router.get("/", (_req, res) => res.json({ name: "node-production-api-starter", version: "v1" }));
v1Router.post("/echo", (req, res, next) => {
  const parsed = echoSchema.safeParse(req.body);
  if (!parsed.success) {
    return next(new AppError(422, "VALIDATION_ERROR", "Request body is invalid", parsed.error.flatten()));
  }
  return res.status(201).json({ data: parsed.data });
});
