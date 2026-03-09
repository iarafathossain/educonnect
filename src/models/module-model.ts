import { mongooseTransform } from "@/lib/mongoose-transform.plugin";
import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema({
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
  mongoose.models?.Module ?? mongoose.model("Module", moduleSchema);
