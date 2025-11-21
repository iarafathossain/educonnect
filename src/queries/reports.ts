import "@/models/assessment-model";

import { catchError } from "@/lib/catch-error";
import { transformMongoDoc } from "@/lib/transform-mongo-doc";
import { ReportModel } from "@/models/report-model";
import { connectDB } from "@/services/connect-mongo";

export const getReportsForStudent = async (filter: {
  student: string;
  course: string;
}) => {
  try {
    await connectDB();

    const report = await ReportModel.findOne(filter)
      .populate({
        path: "quizAssessment",
        model: "Assessment",
      })
      .lean();
    return transformMongoDoc(report);
  } catch (e) {
    const error = catchError(e);
    throw new Error(error);
  }
};
