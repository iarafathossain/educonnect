import type { ActionResponse } from "@/lib/action-types";
import status from "http-status";
import { AppError } from "./app-error";

export function handleActionError(error: unknown): ActionResponse {
  // 1. Handle our expected AppErrors
  if (error instanceof AppError) {
    if (error.statusCode === status.INTERNAL_SERVER_ERROR) {
      console.error("[SERVICE_ERROR]", error);
    }
    return {
      success: false,
      error: error.message,
      statusCode: error.statusCode,
    };
  }

  // 2. Handle unexpected system crashes
  console.error("[UNEXPECTED_ACTION_ERROR]", error);
  return {
    success: false,
    error: "An unexpected internal error occurred.",
    statusCode: status.INTERNAL_SERVER_ERROR,
  };
}
