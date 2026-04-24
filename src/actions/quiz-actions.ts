"use server";

import { actionWrapper } from "@/lib/action-wrapper";
import { quizServices } from "@/services/quiz-services";
import {
  quizCreateInSetZodSchema,
  quizSetCreateZodSchema,
  quizSetUpdateZodSchema,
} from "@/validators/quiz-set-validator";
import status from "http-status";

export const createQuizSetAction = actionWrapper(async (payload: unknown) => {
  const parseData = quizSetCreateZodSchema.safeParse(payload);

  if (!parseData.success) {
    return {
      success: false,
      error: "Validation failed",
      statusCode: status.BAD_REQUEST,
      fieldErrors: parseData.error.flatten().fieldErrors,
    };
  }

  const createdQuizSetId = await quizServices.createQuizSet(parseData.data);

  return {
    success: true,
    message: "Quiz Set Created",
    statusCode: status.CREATED,
    data: createdQuizSetId,
  };
});

export const addQuizToQuizSetAction = actionWrapper(
  async (quizSetId: string, payload: unknown) => {
    const parseData = quizCreateInSetZodSchema.safeParse(payload);

    if (!parseData.success) {
      return {
        success: false,
        error: "Validation failed",
        statusCode: status.BAD_REQUEST,
        fieldErrors: parseData.error.flatten().fieldErrors,
      };
    }

    await quizServices.addQuizToQuizSet(quizSetId, parseData.data);

    return {
      success: true,
      message: "Quiz added to the set successfully!",
      statusCode: status.OK,
    };
  },
);

export const updateQuizSetAction = actionWrapper(
  async (quizSetId: string, payload: unknown) => {
    const parseData = quizSetUpdateZodSchema.safeParse(payload);

    if (!parseData.success) {
      return {
        success: false,
        error: "Validation failed",
        statusCode: status.BAD_REQUEST,
        fieldErrors: parseData.error.flatten().fieldErrors,
      };
    }

    await quizServices.updateQuizSet(quizSetId, parseData.data);

    return {
      success: true,
      message: "Quiz set title updated successfully",
      statusCode: status.OK,
    };
  },
);
