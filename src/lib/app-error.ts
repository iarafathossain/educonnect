import status from "http-status";

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    statusCode: number = status.INTERNAL_SERVER_ERROR,
  ) {
    super(message);
    this.statusCode = statusCode;

    // isOperational is a common Node.js pattern to distinguish between
    // expected business errors (true) and unexpected bugs/crashes (false)
    this.isOperational = true;

    // Capture the stack trace properly
    Error.captureStackTrace(this, this.constructor);
  }
}
