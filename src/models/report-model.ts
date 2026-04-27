import { mongooseTransform } from "@/lib/mongoose-transform.plugin";
import { IReport } from "@/types/backend-index";
import mongoose from "mongoose";

export interface IReportModel extends mongoose.Document, IReport {}

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
