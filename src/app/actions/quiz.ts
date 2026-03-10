"use server";

import { catchError } from "@/lib/catch-error";
import { getSlug } from "@/lib/get-slug";
import { QuizSet } from "@/models/quiz-set-model";
import { quizQueries } from "@/queries/quiz";
import { connectDB } from "@/services/connect-mongo";
import { QuizFormValues } from "@/validations/quiz-validator";
import { TitleFormValues } from "../dashboard/quiz-sets/[quizSetId]/_components/title-form";

export const createQuizSet = async (data: { title: string }) => {
  try {
    await connectDB();

    const slug = getSlug(data.title);

    // checking duplicate quiz set with the same title
    const existingQuizSet = await QuizSet.findOne({ slug });
    if (existingQuizSet) {
      throw new Error("A quiz set with this title already exists.");
    }

    const quizSetData = {
      title: data.title,
      slug: slug,
      active: false,
    };
    const quizSet = await QuizSet.create(quizSetData);
    return quizSet._id.toString();
  } catch (error) {
    console.error("Error creating quiz set:", error);
    throw new Error(error);
  }
};

export const addQuizToQuizSet = async (
  quizSetId: string,
  payload: QuizFormValues,
) => {
  try {
    const transformedQuizData: Record<string, unknown> = {};

    transformedQuizData.title = payload.title;
    transformedQuizData.slug = getSlug(payload.title);
    transformedQuizData.explanation = "";
    transformedQuizData.description = payload.description || "";
    transformedQuizData.mark = 5;
    transformedQuizData.options = [
      {
        text: payload.optionA.label,
        is_correct: payload.optionA.isTrue || false,
      },
      {
        text: payload.optionB.label,
        is_correct: payload.optionB.isTrue || false,
      },
      {
        text: payload.optionC.label,
        is_correct: payload.optionC.isTrue || false,
      },
      {
        text: payload.optionD.label,
        is_correct: payload.optionD.isTrue || false,
      },
    ];

    const createdQuizId = await quizQueries.createQuiz(transformedQuizData);
    const quizSet = await QuizSet.findById(quizSetId);
    if (!quizSet) {
      throw new Error("Quiz set not found");
    }
    quizSet.quizIds.push(createdQuizId);
    await quizSet.save();
  } catch (error: unknown) {
    throw new Error(catchError(error));
  }
};

export const updateQuizSet = async (
  quizSetId: string,
  payload: TitleFormValues,
) => {
  try {
    await connectDB();
    await QuizSet.findByIdAndUpdate(quizSetId, payload);
  } catch (error: unknown) {
    throw new Error(catchError(error));
  }
};
