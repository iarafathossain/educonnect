// ===== Frontend Types Start ===== //

// Form used for user registration
export interface IUserRegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  userRole: "student" | "instructor";
  password: string;
}

// Public-facing user model (no password)
export interface IUserFrontend {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "student" | "instructor";
  phone?: string;
  website?: string;
  bio?: string;
  profilePictureUrl?: string;
  designation?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
}

export interface IModuleFrontend {
  id: string;
  title: string;
  description?: string;
  status: "active" | "inactive" | "completed";
  slug: string;
  courseId: string;
  lessonIds: string[];
  duration: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface ICategoryFrontend {
  id: string;
  title: string;
  description?: string;
  thumbnailUrl?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface ILessonFrontend {
  id: string;
  title: string;
  description?: string;
  videoUrl: string;
  duration: number; // seconds
  published: boolean;
  slug: string;
  access: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface ITestimonialFrontend {
  id: string;
  user: IUserFrontend;
  content: string;
  courseId: string;
  rating: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface ICourseFrontend {
  id: string;
  title: string;
  subtitle?: string;
  quizSet?: string;
  description: string;
  thumbnailUrl?: string;
  price: number;
  active: boolean;
  instructor: IUserFrontend;
  modules: IModuleFrontend[];
  learning?: string[];
  category: ICategoryFrontend | string;
  testimonials?: ITestimonialFrontend[];
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export type PersonalDetailsFormData = {
  firstName?: string;
  lastName?: string;
  email?: string;
  designation?: string;
  bio?: string;
};

export interface IEnrollmentFrontend {
  id: string;
  status: "not-started" | "completed" | "cancelled";
  completionDate?: Date | string;
  paymentMethod: "credit_card" | "paypal" | "stripe";
  student: string;
  course: ICourseFrontend;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

// ===== Frontend Types End ===== //
