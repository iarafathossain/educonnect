import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
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

export const Quiz = mongoose.models.Quiz ?? mongoose.model("Quiz", quizSchema);
