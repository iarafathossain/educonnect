import { transformMongoDoc } from "@/lib/transform-mongo-doc";
import { EnrollmentModel } from "@/models/enrollment-model";
import { connectDB } from "@/services/connect-mongo";

export const getEnrollmentsForCourse = async (courseId: string) => {
  await connectDB();

  const enrollments = await EnrollmentModel.find({ course: courseId }).lean();
  return transformMongoDoc(enrollments);
};
