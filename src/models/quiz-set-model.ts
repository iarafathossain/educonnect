import mongoose from "mongoose";

const quizSetSchema = new mongoose.Schema({
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

export const QuizSet =
  mongoose.models.QuizSet ?? mongoose.model("QuizSet", quizSetSchema);
