import mongoose from "mongoose";

import { catchError } from "@/lib/catch-error";
import { transformMongoDoc } from "@/lib/transform-mongo-doc";
import { EnrollmentModel } from "@/models/enrollment-model";
import { connectDB } from "@/services/connect-mongo";
import { IEnrollment } from "@/types/backend-index";

export const getEnrollmentsForCourse = async (courseId: string) => {
  await connectDB();

  const enrollments = await EnrollmentModel.find({ course: courseId }).lean();
  return transformMongoDoc(enrollments);
};

export const createEnrollment = async (
  courseId: string,
  userId: string,
  paymentMethod: "credit_card" | "paypal" | "stripe"
) => {
  try {
    await connectDB();
    const newEnrollment: IEnrollment = {
      student: new mongoose.Types.ObjectId(userId),
      course: new mongoose.Types.ObjectId(courseId),
      paymentMethod,
      status: "not-started",
      completionDate: undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await EnrollmentModel.create(newEnrollment);
  } catch (e) {
    const error = catchError(e);
    throw new Error(error);
  }
};
