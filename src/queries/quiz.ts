import { Quiz } from "@/models/quiz-model";
import { QuizSet } from "@/models/quiz-set-model";
import { connectDB } from "@/services/connect-mongo";

export const quizQueries = {
  getAllQuiSets: async (excludeUnpublished: boolean = false) => {
    try {
      await connectDB();
      let quizzes = [];

      if (excludeUnpublished) {
        quizzes = await QuizSet.find({ active: true }).lean();
      } else {
        quizzes = await QuizSet.find().lean();
      }

      return JSON.parse(JSON.stringify(quizzes));
    } catch (error) {
      console.error("Error fetching quiz sets:", error);
    }
  },
  createQuiz: async (quizData: Record<string, any>) => {
    try {
      await connectDB();
      const quiz = await Quiz.create(quizData);
      return quiz._id.toString();
    } catch (error) {
      console.error("Error creating quiz:", error);
      throw new Error(error);
    }
  },
  getQuizSetById: async (quizSetId: string) => {
    try {
      await connectDB();
      const quizSet = await QuizSet.findById(quizSetId)
        .populate({
          path: "quizIds",
          model: "Quiz",
        })
        .lean();
      if (!quizSet) {
        throw new Error("Quiz set not found");
      }
      return JSON.parse(JSON.stringify(quizSet));
    } catch (error) {
      throw new Error(error);
    }
  },
};
