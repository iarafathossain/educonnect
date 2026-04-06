// 1. Define the values as a read-only array
export const USER_ROLES = {
  student: "student",
  instructor: "instructor",
  admin: "admin",
} as const;
export const COURSE_STATUSES = ["draft", "published", "archived"] as const;

// 2. Export the derived TypeScript types (Optional, but highly useful)
// This creates: type TUserRole = "student" | "instructor" | "admin"
export type TUserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];
export type TCourseStatus = (typeof COURSE_STATUSES)[number];
