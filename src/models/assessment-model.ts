import { mongooseTransform } from "@/lib/mongoose-transform.plugin";
import mongoose from "mongoose";

export interface IAssessment extends mongoose.Document {
  assessments: unknown[];
  otherMarks: number;
}

const assessmentSchema = new mongoose.Schema<IAssessment>({
  assessments: {
    type: Array,
    required: true,
  },
  otherMarks: {
    type: Number,
    required: true,
  },
});

assessmentSchema.plugin(mongooseTransform);

export const AssessmentModel =
  mongoose.models?.Assessment || mongoose.model("Assessment", assessmentSchema);
