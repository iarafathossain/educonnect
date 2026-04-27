import { mongooseTransform } from "@/lib/mongoose-transform.plugin";
import mongoose from "mongoose";

export interface IReportModel extends mongoose.Document {
  student: mongoose.Types.ObjectId;
  course: mongoose.Types.ObjectId;
  totalCompletedModules: mongoose.Types.ObjectId[];
  totalCompletedLessons: mongoose.Types.ObjectId[];
  quizAssessment: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const reportSchema = new mongoose.Schema<IReportModel>(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    totalCompletedModules: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Module",
      },
    ],
    totalCompletedLessons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lesson",
      },
    ],
    quizAssessment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assessment",
    },
  },
  { timestamps: true },
);

reportSchema.plugin(mongooseTransform);

export const ReportModel =
  mongoose.models?.Report || mongoose.model("Report", reportSchema);
