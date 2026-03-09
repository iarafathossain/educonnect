import { mongooseTransform } from "@/lib/mongoose-transform.plugin";
import mongoose, { Schema } from "mongoose";

const assessmentSchema = new Schema({
  assessments: {
    required: true,
    type: Array,
  },
  otherMarks: {
    required: true,
    type: Number,
  },
});

assessmentSchema.plugin(mongooseTransform);

export const Assessment =
  mongoose.models.Assessment ?? mongoose.model("Assessment", assessmentSchema);
