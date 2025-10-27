import { ILesson } from "@/types/backend-index";
import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema<ILesson>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  videoUrl: { type: String, required: true },
  duration: { type: Number, required: true },
  published: { type: Boolean, required: true },
  slug: { type: String, required: true },
  access: { type: String, required: true },
});
export const LessonModel =
  (mongoose.models.Lesson as mongoose.Model<ILesson>) ||
  mongoose.model<ILesson>("Lesson", lessonSchema);
