import { AppError } from "@/lib/app-error";
import { connectDB } from "@/lib/connect-mongo";
import { getSlug } from "@/lib/get-slug";
import { QuizModel } from "@/models/quiz-model";
import { QuizSetModel } from "@/models/quiz-set-model";
import {
  TQuizCreateInSetPayload,
  TQuizSetCreatePayload,
  TQuizSetUpdatePayload,
} from "@/validators/quiz-set-validator";
import status from "http-status";

export const quizServices = {
  getAllQuizSets: async (excludeUnpublished: boolean = false) => {
    await connectDB();
    const quizSets = excludeUnpublished
      ? await QuizSetModel.find({ active: true })
      : await QuizSetModel.find();

    return quizSets.map((quizSet) => quizSet.toJSON());
  },

  getQuizSetById: async (quizSetId: string) => {
    await connectDB();
    const quizSet = await QuizSetModel.findById(quizSetId).populate({
      path: "quizIds",
      model: "Quiz",
    });

    if (!quizSet) {
      throw new AppError("Quiz set not found", status.NOT_FOUND);
    }

    return quizSet.toJSON();
  },

  createQuizSet: async (payload: TQuizSetCreatePayload) => {
    await connectDB();

    const slug = getSlug(payload.title);
    const existingQuizSet = await QuizSetModel.findOne({ slug });

    if (existingQuizSet) {
      throw new AppError(
        "A quiz set with this title already exists.",
        status.CONFLICT,
      );
    }

    const quizSet = await QuizSetModel.create({
      title: payload.title,
      slug,
      active: false,
    });

    return quizSet.id;
  },

  addQuizToQuizSet: async (
    quizSetId: string,
    payload: TQuizCreateInSetPayload,
  ) => {
    await connectDB();

    const quizSet = await QuizSetModel.findById(quizSetId);
    if (!quizSet) {
      throw new AppError("Quiz set not found", status.NOT_FOUND);
    }

    const createdQuiz = await QuizModel.create({
      title: payload.title,
      slug: getSlug(payload.title),
      explanation: "",
      description: payload.description || "",
      mark: 5,
      options: [
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
      ],
    });

    quizSet.quizIds.push(createdQuiz.id);
    await quizSet.save();

    return createdQuiz.toJSON();
  },

  updateQuizSet: async (quizSetId: string, payload: TQuizSetUpdatePayload) => {
    await connectDB();

    const slug = getSlug(payload.title);
    const existingQuizSet = await QuizSetModel.findOne({
      slug,
      _id: { $ne: quizSetId },
    });

    if (existingQuizSet) {
      throw new AppError(
        "A quiz set with this title already exists.",
        status.CONFLICT,
      );
    }

    const updatedQuizSet = await QuizSetModel.findByIdAndUpdate(
      quizSetId,
      {
        title: payload.title,
        slug,
      },
      { new: true },
    );

    if (!updatedQuizSet) {
      throw new AppError("Quiz set not found", status.NOT_FOUND);
    }

    return updatedQuizSet.toJSON();
  },
};

export const getAllQuizSets = quizServices.getAllQuizSets;
export const getQuizSetById = quizServices.getQuizSetById;
export const createQuizSet = quizServices.createQuizSet;
export const addQuizToQuizSet = quizServices.addQuizToQuizSet;
export const updateQuizSet = quizServices.updateQuizSet;
