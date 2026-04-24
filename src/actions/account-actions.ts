"use server";

import { actionWrapper } from "@/lib/action-wrapper";
import { accountServices } from "@/services/account-services";
import {
  changePasswordPayloadZodSchema,
  contactInfoUpdateZodSchema,
  personalDetailsUpdateZodSchema,
} from "@/validators/account-validator";
import status from "http-status";
import { revalidatePath } from "next/cache";

export const updatePersonalDetailsAction = actionWrapper(
  async (email: string, payload: unknown) => {
    const parseData = personalDetailsUpdateZodSchema.safeParse(payload);

    if (!parseData.success) {
      return {
        success: false,
        error: "Validation failed",
        statusCode: status.BAD_REQUEST,
        fieldErrors: parseData.error.flatten().fieldErrors,
      };
    }

    await accountServices.updatePersonalDetails(email, parseData.data);
    revalidatePath("/account");

    return {
      success: true,
      message: "Personal details updated successfully",
      statusCode: status.OK,
    };
  },
);

export const updateContactInfoAction = actionWrapper(
  async (email: string, payload: unknown) => {
    const parseData = contactInfoUpdateZodSchema.safeParse(payload);

    if (!parseData.success) {
      return {
        success: false,
        error: "Validation failed",
        statusCode: status.BAD_REQUEST,
        fieldErrors: parseData.error.flatten().fieldErrors,
      };
    }

    await accountServices.updateContactInfo(email, parseData.data);
    revalidatePath("/account");

    return {
      success: true,
      message: "Contact information updated successfully",
      statusCode: status.OK,
    };
  },
);

export const changePasswordAction = actionWrapper(
  async (email: string, payload: unknown) => {
    const parseData = changePasswordPayloadZodSchema.safeParse(payload);

    if (!parseData.success) {
      return {
        success: false,
        error: "Validation failed",
        statusCode: status.BAD_REQUEST,
        fieldErrors: parseData.error.flatten().fieldErrors,
      };
    }

    await accountServices.changePassword(email, parseData.data);
    revalidatePath("/account");

    return {
      success: true,
      message: "Password changed successfully",
      statusCode: status.OK,
    };
  },
);
