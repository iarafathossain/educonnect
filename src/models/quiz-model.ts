import { mongooseTransform } from "@/lib/mongoose-transform.plugin";
import mongoose from "mongoose";

export interface IQuiz extends mongoose.Document {
  quizSet: mongoose.Types.ObjectId;
  title: string;
  slug: string;
  explanation?: string;
  description?: string;
  options?: unknown[];
  mark: number;
}

const quizSchema = new mongoose.Schema<IQuiz>({
  quizSet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "QuizSet",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
    required: true,
  },
  explanation: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  options: Array,
  mark: {
    type: Number,
    required: true,
    default: 5,
  },
});

quizSchema.plugin(mongooseTransform);

export const QuizModel =
  mongoose.models?.Quiz || mongoose.model("Quiz", quizSchema);
