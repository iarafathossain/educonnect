"use server";

import { actionWrapper } from "@/lib/action-wrapper";
import { lessonServices } from "@/services/lesson-services";
import {
  lessonCreateZodSchema,
  lessonReorderZodSchema,
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