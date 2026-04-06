"use server";

import { signIn } from "@/auth";
import { actionWrapper } from "@/lib/action-wrapper";
import { authServices } from "@/services/auth-services";
import {
  TUserLogin,
  userRegistrationZodSchema,
} from "@/validators/user-schema";
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

export const credentialLoginAction = actionWrapper(
  async (payload: TUserLogin) => {
    const response = await signIn("credentials", {
      email: payload.email,
      password: payload.password,
      redirect: false,
    });

    if (response?.error) {
      return {
        success: false,
        error: response.error,
        statusCode: status.UNAUTHORIZED,
      };
    }

    return {
      success: true,
      message: "Logged in successfully",
      statusCode: status.OK,
    };
  },
);

export const socialLoginAction = actionWrapper(async (formData: FormData) => {
  const action = formData.get("action") as string;
  await signIn(action, { redirectTo: "/courses" });

  return {
    success: true,
    message: "Logged in successfully",
    statusCode: status.OK,
  };
});
