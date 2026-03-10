import { catchError } from "@/lib/catch-error";
import { Quiz } from "@/models/quiz-model";
import { QuizSet } from "@/models/quiz-set-model";
import { connectDB } from "@/services/connect-mongo";

export const quizQueries = {
  getAllQuiSets: async (excludeUnpublished: boolean = false) => {
    try {
      await connectDB();
      let quizzes = [];

      if (excludeUnpublished) {
        quizzes = await QuizSet.find({ active: true });
      } else {
        quizzes = await QuizSet.find();
      }

      return quizzes.map((quizSet) => quizSet.toJSON());
    } catch (error: unknown) {
      throw new Error(catchError(error));
    }
  },
  createQuiz: async (quizData: Record<string, unknown>) => {
    try {
      await connectDB();
      const quiz = await Quiz.create(quizData);
      return quiz.id;
    } catch (error: unknown) {
      throw new Error(catchError(error));
    }
  },
  getQuizSetById: async (quizSetId: string) => {
    try {
      await connectDB();
      const quizSet = await QuizSet.findById(quizSetId).populate({
        path: "quizIds",
        model: "Quiz",
      });
      if (!quizSet) {
        throw new Error("Quiz set not found");
      }
      return quizSet.toJSON();
    } catch (error: unknown) {
      throw new Error(catchError(error));
    }
  },
};
