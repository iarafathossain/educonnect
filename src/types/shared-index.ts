// ===== Shared Domain Types Start ===== //

export type UserRole = "student" | "instructor";
export type ModuleStatus = "active" | "inactive" | "completed";
export type EnrollmentStatus = "not-started" | "completed" | "cancelled";
export type PaymentMethod = "credit_card" | "paypal" | "stripe";

export interface ISocialLinks {
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
}

export interface IUserBase {
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  phone?: string;
  website?: string;
  bio?: string;
  profilePictureUrl?: string;
  designation?: string;
  socialLinks?: ISocialLinks;
}

export interface ICourseBase {
  title: string;
  description: string;
  price: number;
  active: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface IModuleBase {
  title: string;
  active: boolean;
  description?: string;
  slug: string;
  lessonIds: string[];
  duration: number;
  order: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface ILessonBase {
  title: string;
  description?: string;
  videoURL?: string;
  duration?: number;
  active?: boolean;
  slug: string;
  access?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface ITestimonialBase {
  rating: number;
  content: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface IEnrollmentBase {
  status: EnrollmentStatus;
  paymentMethod: PaymentMethod;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  studentName?: string;
  studentEmail?: string;
  progress?: number;
  quizMark?: number;
}

export interface IReorderItem {
  id: string;
  position: number;
}

// ===== Shared Domain Types End ===== //
