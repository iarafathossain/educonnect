import { ICategory, ILesson } from "./backend-index";

// ===== Frontend Types Start ===== //
export interface IUserRegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  userRole: "student" | "instructor";
  password: string;
}

export interface ICategoryFrontend extends ICategory {
  id: string;
}

export interface ILessonFrontend extends ILesson {
  id: string;
}

// ===== Frontend Types End ===== //
