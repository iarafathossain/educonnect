"use server";

import { actionWrapper } from "@/lib/action-wrapper";
import { lessonServices } from "@/services/lesson-services";
import {
  lessonCreateZodSchema,
  lessonDeleteZodSchema,
  lessonReorderZodSchema,
  lessonUpdateZodSchema,
} from "@/validators/lesson-validator";
import status from "http-status";

export const createLessonAction = actionWrapper(async (payload: unknown) => {
  const parseData = lessonCreateZodSchema.safeParse(payload);

  if (!parseData.success) {
    return {
      success: false,
      error: "Validation failed",
      statusCode: status.BAD_REQUEST,
      fieldErrors: parseData.error.flatten().fieldErrors,
    };
  }

  const createdLesson = await lessonServices.create(parseData.data);

  return {
    success: true,
    message: "Lesson created successfully",
    statusCode: status.CREATED,
    data: createdLesson,
  };
});

export const reorderLessonsAction = actionWrapper(async (payload: unknown) => {
  const parseData = lessonReorderZodSchema.safeParse(payload);

  if (!parseData.success) {
    return {
      success: false,
      error: "Validation failed",
      statusCode: status.BAD_REQUEST,
    };
  }

  await lessonServices.reorder(parseData.data);

  return {
    success: true,
    message: "Lessons reordered successfully",
    statusCode: status.OK,
  };
});

export const updateLessonAction = actionWrapper(
  async (lessonId: string, payload: unknown) => {
    const parseData = lessonUpdateZodSchema.safeParse(payload);

    if (!parseData.success) {
      return {
        success: false,
        error: "Validation failed",
        statusCode: status.BAD_REQUEST,
        fieldErrors: parseData.error.flatten().fieldErrors,
      };
    }

    await lessonServices.update(lessonId, parseData.data);

    return {
      success: true,
      message: "Lesson updated successfully",
      statusCode: status.OK,
    };
  },
);

export const changeLessonPublishStateAction = actionWrapper(
  async (lessonId: string) => {
    const activeState = await lessonServices.changePublishState(lessonId);

    return {
      success: true,
      message: "Lesson publish state changed successfully",
      statusCode: status.OK,
      data: activeState,
    };
  },
);

export const deleteLessonAction = actionWrapper(async (payload: unknown) => {
  const parseData = lessonDeleteZodSchema.safeParse(payload);

  if (!parseData.success) {
    return {
      success: false,
      error: "Validation failed",
      statusCode: status.BAD_REQUEST,
      fieldErrors: parseData.error.flatten().fieldErrors,
    };
  }

  await lessonServices.delete(parseData.data);

  return {
    success: true,
    message: "Lesson deleted successfully",
    statusCode: status.OK,
  };
});