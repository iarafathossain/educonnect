import {
  ICategoryBase,
  ICourseBase,
  IEnrollmentBase,
  ILessonBase,
  IModuleBase,
  ITestimonialBase,
  IUserBase,
} from "@/types/shared-index";
import mongoose from "mongoose";

// ===== BACKEND TYPES START ===== //
export interface IUser extends IUserBase {
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICourse extends ICourseBase {
  instructor: mongoose.Types.ObjectId;
  modules: mongoose.Types.ObjectId[];
  category: mongoose.Types.ObjectId;
  quizzes?: mongoose.Types.ObjectId[];
  testimonials?: mongoose.Types.ObjectId[];
}

export interface IModule extends Omit<
  IModuleBase,
  "description" | "createdAt" | "updatedAt"
> {
  description: string;
  course: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICategory extends Omit<
  ICategoryBase,
  "image" | "createdAt" | "updatedAt"
> {
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITestimonial extends Omit<
  ITestimonialBase,
  "createdAt" | "updatedAt"
> {
  user: mongoose.Types.ObjectId;
  course: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface ILesson extends Omit<
  ILessonBase,
  "description" | "createdAt" | "updatedAt"
> {
  description: string;
}

export interface IEnrollment extends Omit<
  IEnrollmentBase,
  "completionDate" | "createdAt" | "updatedAt"
> {
  course: mongoose.Types.ObjectId;
  student: mongoose.Types.ObjectId;
  completionDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IReport {
  student: mongoose.Types.ObjectId;
  course: mongoose.Types.ObjectId;
  totalCompletedModules: mongoose.Types.ObjectId[];
  totalCompletedLessons: mongoose.Types.ObjectId[];
  quizAssessment: mongoose.Types.ObjectId;
}
// ===== BACKEND TYPES END ===== //
