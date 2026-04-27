import { mongooseTransform } from "@/lib/mongoose-transform.plugin";
import mongoose from "mongoose";

export interface IModule extends mongoose.Document {
  title: string;
  description?: string;
  active: boolean;
  slug: string;
  course: mongoose.Types.ObjectId;
  lessonIds?: mongoose.Types.ObjectId[];
  order: number;
}

const moduleSchema = new mongoose.Schema<IModule>({
  title: {
    required: true,
    type: String,
  },
  description: {
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
  course: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
  },
  lessonIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }],
  order: {
    required: true,
    type: Number,
  },
});

moduleSchema.plugin(mongooseTransform);

export const ModuleModel =
  mongoose.models?.Module || mongoose.model("Module", moduleSchema);
