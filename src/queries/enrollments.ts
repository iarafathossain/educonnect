import mongoose from "mongoose";

import { catchError } from "@/lib/catch-error";
import { EnrollmentModel } from "@/models/enrollment-model";
import { connectDB } from "@/services/connect-mongo";
import { IEnrollment } from "@/types/backend-index";

export const getEnrollmentsForCourse = async (courseId: string) => {
  await connectDB();

  const enrollments = await EnrollmentModel.find({ course: courseId });
  return enrollments.map((enrollment) => enrollment.toJSON());
};

export const createEnrollment = async (
  courseId: string,
  userId: string,
  paymentMethod: "credit_card" | "paypal" | "stripe",
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

    //TODO: Check if enrollment already exists

    await EnrollmentModel.create(newEnrollment);
  } catch (e) {
    const error = catchError(e);
    throw new Error(error);
  }
};

export const getEnrollmentsForStudent = async (studentId: string) => {
  await connectDB();

  try {
    const enrollments = await EnrollmentModel.find({
      student: studentId,
    }).populate({
      path: "course",
      model: "Course",
    });

    return enrollments.map((enrollment) => enrollment.toJSON());
  } catch (e) {
    const error = catchError(e);
    throw new Error(error);
  }
};

export const hasEnrollmentForCourse = async (
  courseId: string,
  userId: string,
) => {
  await connectDB();
  const enrollment = await EnrollmentModel.findOne({
    course: courseId,
    student: userId,
  });
  return enrollment ? enrollment.toJSON() : null;
};
