"use server";

import { actionWrapper } from "@/lib/action-wrapper";
import { moduleServices } from "@/services/module-services";
import {
  moduleCreateZodSchema,
  moduleDeleteZodSchema,
  moduleReorderZodSchema,
  moduleUpdateZodSchema,
} from "@/validators/module-validator";
import status from "http-status";

export const createModuleAction = actionWrapper(async (payload: unknown) => {
  const parseData = moduleCreateZodSchema.safeParse(payload);

  if (!parseData.success) {
    return {
      success: false,
      error: "Validation failed",
      statusCode: status.BAD_REQUEST,
      fieldErrors: parseData.error.flatten().fieldErrors,
    };
  }

  const createdModule = await moduleServices.create(parseData.data);

  return {
    success: true,
    message: "Module created successfully",
    statusCode: status.CREATED,
    data: createdModule,
  };
});

export const reorderModulesAction = actionWrapper(async (payload: unknown) => {
  const parseData = moduleReorderZodSchema.safeParse(payload);

  if (!parseData.success) {
    return {
      success: false,
      error: "Validation failed",
      statusCode: status.BAD_REQUEST,
    };
  }

  await moduleServices.reorder(parseData.data);

  return {
    success: true,
    message: "Modules reordered successfully",
    statusCode: status.OK,
  };
});

export const updateModuleAction = actionWrapper(
  async (moduleId: string, payload: unknown) => {
    const parseData = moduleUpdateZodSchema.safeParse(payload);

    if (!parseData.success) {
      return {
        success: false,
        error: "Validation failed",
        statusCode: status.BAD_REQUEST,
        fieldErrors: parseData.error.flatten().fieldErrors,
      };
    }

    await moduleServices.update(moduleId, parseData.data);

    return {
      success: true,
      message: "Module updated successfully",
      statusCode: status.OK,
    };
  },
);

export const changeModulePublishStateAction = actionWrapper(
  async (moduleId: string) => {
    const activeState = await moduleServices.changePublishState(moduleId);

    return {
      success: true,
      message: "Module publish state changed successfully",
      statusCode: status.OK,
      data: activeState,
    };
  },
);

export const deleteModuleAction = actionWrapper(async (payload: unknown) => {
  const parseData = moduleDeleteZodSchema.safeParse(payload);

  if (!parseData.success) {
    return {
      success: false,
      error: "Validation failed",
      statusCode: status.BAD_REQUEST,
      fieldErrors: parseData.error.flatten().fieldErrors,
    };
  }

  await moduleServices.delete(parseData.data.moduleId, parseData.data.courseId);

  return {
    success: true,
    message: "Module deleted successfully",
    statusCode: status.OK,
  };
});
