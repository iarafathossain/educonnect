// ===== user types for frontend ===== //
export interface IUserRegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  userRole: "student" | "instructor";
  password: string;
}
