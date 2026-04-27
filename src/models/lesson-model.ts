import { mongooseTransform } from "@/lib/mongoose-transform.plugin";
import mongoose from "mongoose";

export interface ILesson extends mongoose.Document {
  title: string;
  description?: string;
  duration: number;
  videoURL?: string;
  active: boolean;
  slug: string;
  access: string;
  order: number;
}

const lessonSchema = new mongoose.Schema<ILesson>({
  title: {
    required: true,
    type: String,
  },
  description: {
    type: String,
  },
  duration: {
    required: true,
    default: 0,
    type: Number,
  },
  videoURL: {
    type: String,
  },
  active: {
    required: true,
    default: false,
    type: Boolean,
  },
  slug: {
    required: true,
    type: String,
  },
  access: {
    required: true,
    default: "private",
    type: String,
  },
  order: {
    required: true,
    type: Number,
  },
});

lessonSchema.plugin(mongooseTransform);

export const LessonModel =
  mongoose.models?.Lesson || mongoose.model("Lesson", lessonSchema);
