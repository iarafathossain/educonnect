// ===== Frontend Types Start ===== //

import {
  ICourseBase,
  IEnrollmentBase,
  ILessonBase,
  IModuleBase,
  ITestimonialBase,
  IUserBase,
  UserRole,
} from "@/types/shared-index";

// Form used for user registration
export interface IUserRegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  userRole: UserRole;
  password: string;
}

// Public-facing user model (no password)
export interface IUserFrontend extends IUserBase {
  id: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface IModuleFrontend extends IModuleBase {
  id: string;
  courseId: string;
}

export interface ICategoryFrontend {
  id: string;
  label: string;
  value: string;
  thumbnailUrl: string;
}

export interface ILessonFrontend extends ILessonBase {
  id: string;
}

export interface ITestimonialFrontend extends ITestimonialBase {
  id: string;
  user: IUserFrontend;
  courseId: string;
}

export interface ICourseFrontend extends ICourseBase {
  id: string;
  subtitle?: string;
  quizSet?: string;
  thumbnailUrl?: string;
  instructor: IUserFrontend;
  modules: IModuleFrontend[];
  learning?: string[];
  category: ICategoryFrontend;
  testimonials?: ITestimonialFrontend[];
}

export type PersonalDetailsFormData = {
  firstName?: string;
  lastName?: string;
  email?: string;
  designation?: string;
  bio?: string;
};

export interface IEnrollmentFrontend extends IEnrollmentBase {
  id: string;
  course: ICourseFrontend;
  student: IUserFrontend;
}

export interface ILessonPayload {
  title: string;
  slug: string;
  moduleId: string;
  order: number;
}

// ===== Frontend Types End ===== //
