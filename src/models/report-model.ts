import { IReport } from "@/types/backend-index";
import mongoose from "mongoose";

const reportSchema = new mongoose.Schema<IReport>(
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
  { timestamps: true }
);

export const ReportModel =
  (mongoose.models?.Report as mongoose.Model<IReport>) ||
  mongoose.model<IReport>("Report", reportSchema);
