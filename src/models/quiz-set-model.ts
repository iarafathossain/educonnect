import { mongooseTransform } from "@/lib/mongoose-transform.plugin";
import mongoose from "mongoose";

export interface IQuizSet extends mongoose.Document {
  instructor: mongoose.Types.ObjectId;
  title: string;
  slug: string;
  description?: string;
  quizIds?: mongoose.Types.ObjectId[];
  active: boolean;
}

const quizSetSchema = new mongoose.Schema<IQuizSet>({
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  quizIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Quiz" }],
  active: {
    type: Boolean,
    required: true,
    default: false,
  },
});

quizSetSchema.plugin(mongooseTransform);

export const QuizSetModel =
  mongoose.models?.QuizSet || mongoose.model("QuizSet", quizSetSchema);
