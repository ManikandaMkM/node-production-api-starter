export class AppError extends Error {
  constructor(status, code, message, details) {
    super(message);
    this.name = "AppError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export function notFoundHandler(req, _res, next) {
  next(new AppError(404, "NOT_FOUND", `No route for ${req.method} ${req.path}`));
}

export function errorHandler(error, req, res, _next) {
  const status = error instanceof AppError ? error.status : 500;
  const code = error instanceof AppError ? error.code : "INTERNAL_ERROR";
  req.log?.[status >= 500 ? "error" : "warn"]({ err: error, code }, error.message);
  res.status(status).json({
    error: {
      code,
      message: status >= 500 ? "An unexpected error occurred" : error.message,
      ...(error.details ? { details: error.details } : {}),
      requestId: req.id,
    },
  });
}
