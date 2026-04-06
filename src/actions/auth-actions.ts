"use server";

import { actionWrapper } from "@/lib/action-wrapper";
import { authServices } from "@/services/auth-services";
import { userRegistrationZodSchema } from "@/validators/user-schema";
import status from "http-status";

export const userRegistrationAction = actionWrapper(
  async (payload: unknown) => {
    // validation
    const parseData = userRegistrationZodSchema.safeParse(payload);

    if (!parseData.success) {
      return {
        success: false,
        error: "Validation failed",
        statusCode: status.BAD_REQUEST,
        fieldErrors: parseData.error.flatten().fieldErrors,
      };
    }

    const createdUser = await authServices.register(parseData.data);

    return {
      success: true,
      message: "User registered successfully",
      statusCode: status.CREATED,
      data: createdUser,
    };
  },
);
