import mongoose from "mongoose";

// ===== BACKEND TYPES START ===== //
export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "student" | "instructor";
  phone?: string;
  bio: string;
  profilePictureUrl?: string;
  createdAt: Date;
  updatedAt: Date;
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
  instructor: { type: mongoose.Schema.Types.ObjectId; ref: "User" };
  modules: { type: mongoose.Schema.Types.ObjectId; ref: "Module" }[];
  category: { type: mongoose.Schema.Types.ObjectId; ref: "Category" };
  quizzes?: { type: mongoose.Schema.Types.ObjectId; ref: "Quiz" }[];
  testimonials?: { type: mongoose.Schema.Types.ObjectId; ref: "Testimonial" }[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IModule {
  title: string;
  description: string;
  status: "locked" | "unlocked" | "completed";
  slug: string;
  course: { type: mongoose.Schema.Types.ObjectId; ref: "Course" };
  lessonIds: { type: mongoose.Schema.Types.ObjectId; ref: "Lesson" }[];
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
  user: { type: mongoose.Schema.Types.ObjectId; ref: "User" };
  course: { type: mongoose.Schema.Types.ObjectId; ref: "Course" };
  rating: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
// ===== BACKEND TYPES END ===== //
