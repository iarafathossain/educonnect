import { ICourse } from "@/types/backend-index";
import mongoose from "mongoose";

const courseSchema = new mongoose.Schema<ICourse>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    price: { type: Number, required: true },
    active: { type: Boolean, default: true },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    modules: [{ type: mongoose.Schema.Types.ObjectId, ref: "Module" }],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    quizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Quiz" }],
    testimonials: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Testimonial" },
    ],
  },
  { timestamps: true }
);

export const CourseModel =
  (mongoose.models?.Course as mongoose.Model<ICourse>) ||
  mongoose.model<ICourse>("Course", courseSchema);
