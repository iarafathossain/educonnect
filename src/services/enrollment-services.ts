import { catchError } from "@/lib/catch-error";
import { connectDB } from "@/lib/connect-mongo";
import { EnrollmentModel, IEnrollmentModel } from "@/models/enrollment-model";
import mongoose from "mongoose";

export const enrollmentServices = {
  getEnrollmentsForCourse: async (courseId: string) => {
    await connectDB();

    // populate course details and student details
    const enrollments = await EnrollmentModel.find({
      course: courseId,
    })
      .populate({
        path: "course",
        model: "Course",
      })
      .populate({
        path: "student",
        model: "User",
      });
    return enrollments.map((enrollment) => enrollment.toJSON());
  },

  createEnrollment: async (
    courseId: string,
    userId: string,
    paymentMethod: "stripe",
  ) => {
    try {
      await connectDB();
      const newEnrollment: Omit<IEnrollmentModel, keyof mongoose.Document> = {
        student: new mongoose.Types.ObjectId(userId),
        course: new mongoose.Types.ObjectId(courseId),
        paymentMethod,
        status: "not-started",
        completionDate: undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await EnrollmentModel.create(newEnrollment);
      return newEnrollment;
    } catch (e) {
      const error = catchError(e);
      throw new Error(error);
    }
  },

  getEnrollmentsForStudent: async (studentId: string) => {
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
  },

  hasEnrollmentForCourse: async (courseId: string, userId: string) => {
    await connectDB();
    const enrollment = await EnrollmentModel.findOne({
      course: courseId,
      student: userId,
    });
    return enrollment ? enrollment.toJSON() : null;
  },
};

export const getEnrollmentsForCourse =
  enrollmentServices.getEnrollmentsForCourse;
export const createEnrollment = enrollmentServices.createEnrollment;
export const getEnrollmentsForStudent =
  enrollmentServices.getEnrollmentsForStudent;
export const hasEnrollmentForCourse = enrollmentServices.hasEnrollmentForCourse;
