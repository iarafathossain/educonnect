import { IModule } from "@/types/backend-index";
import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema<IModule>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ["locked", "unlocked", "completed"],
    required: true,
  },
  slug: { type: String, required: true },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  lessonIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const ModuleModel =
  (mongoose.models.Module as mongoose.Model<IModule>) ||
  mongoose.model<IModule>("Module", moduleSchema);
