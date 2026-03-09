import "@/models/assessment-model";

import { catchError } from "@/lib/catch-error";
import { ReportModel } from "@/models/report-model";
import { connectDB } from "@/services/connect-mongo";

export const getReportsForStudent = async (filter: {
  student: string;
  course: string;
}) => {
  try {
    await connectDB();

    const report = await ReportModel.findOne(filter).populate({
      path: "quizAssessment",
      model: "Assessment",
    });
    return report ? report.toJSON() : null;
  } catch (e) {
    const error = catchError(e);
    throw new Error(error);
  }
};
