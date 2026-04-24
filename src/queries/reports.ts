import "@/models/assessment-model";

import { catchError } from "@/lib/catch-error";
import { connectDB } from "@/lib/connect-mongo";
import { ReportModel } from "@/models/report-model";

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
