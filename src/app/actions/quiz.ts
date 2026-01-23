"use server";

import { getSlug } from "@/lib/get-slug";
import { QuizSet } from "@/models/quiz-set-model";
import { quizQueries } from "@/queries/quiz";
import { connectDB } from "@/services/connect-mongo";

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

export const addQuizToQuizSet = async (quizSetId: string, quizData: any) => {
  try {
    const transformedQuizData: Record<string, any> = {};

    transformedQuizData.title = quizData.title;
    transformedQuizData.slug = getSlug(quizData.title);
    transformedQuizData.explanation = quizData.explanation || "";
    transformedQuizData.description = quizData.description || "";
    transformedQuizData.mark = Number(quizData.mark) || 5;
    transformedQuizData.options = [
      {
        text: quizData.optionA.label,
        is_correct: quizData.optionA.isTrue || false,
      },
      {
        text: quizData.optionB.label,
        is_correct: quizData.optionB.isTrue || false,
      },
      {
        text: quizData.optionC.label,
        is_correct: quizData.optionC.isTrue || false,
      },
      {
        text: quizData.optionD.label,
        is_correct: quizData.optionD.isTrue || false,
      },
    ];

    const createdQuizId = await quizQueries.createQuiz(transformedQuizData);
    const quizSet = await QuizSet.findById(quizSetId);
    if (!quizSet) {
      throw new Error("Quiz set not found");
    }
    quizSet.quizIds.push(createdQuizId);
    await quizSet.save();
  } catch (error) {
    console.error("Error adding quiz to quiz set:", error);
    throw new Error(error);
  }
};

export const updateQuizSet = async (quizSetId: string, dataToUpdate: any) => {
  try {
    await connectDB();
    await QuizSet.findByIdAndUpdate(quizSetId, dataToUpdate);
  } catch (error) {
    throw new Error(error);
  }
};
