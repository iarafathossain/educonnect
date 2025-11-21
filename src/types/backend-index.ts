import mongoose from "mongoose";

// ===== BACKEND TYPES START ===== //
export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "student" | "instructor";
  phone?: string;
  website?: string;
  bio?: string;
  profilePictureUrl?: string;
  designation?: string;
  createdAt?: Date;
  updatedAt?: Date;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
}

export interface ICourse {
  title: string;
  description: string;
  thumbnailUrl: string;
  price: number;
  active: boolean;
  instructor: mongoose.Types.ObjectId;
  modules: mongoose.Types.ObjectId[];
  category: mongoose.Types.ObjectId;
  quizzes?: mongoose.Types.ObjectId[];
  testimonials?: mongoose.Types.ObjectId[];
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface IModule {
  title: string;
  description: string;
  status: "active" | "inactive" | "completed";
  slug: string;
  course: mongoose.Types.ObjectId;
  lessonIds: string[];
  duration: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICategory {
  title: string;
  description?: string;
  thumbnailUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITestimonial {
  user: mongoose.Types.ObjectId;
  course: mongoose.Types.ObjectId;
  rating: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ILesson {
  title: string;
  description: string;
  videoUrl: string;
  duration: number;
  published: boolean;
  slug: string;
  access: string;
}

export interface IEnrollment {
  course: mongoose.Types.ObjectId;
  student: mongoose.Types.ObjectId;
  status: "not-started" | "completed" | "cancelled";
  paymentMethod: "credit_card" | "paypal" | "stripe";
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
