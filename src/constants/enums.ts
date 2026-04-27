// user roles
export const USER_ROLES = {
  student: "student",
  instructor: "instructor",
  admin: "admin",
} as const;

// course statuses
export const COURSE_STATUSES = ["draft", "published", "archived"] as const;

// enrollment statuses
export const ENROLLMENT_STATUSES = [
  "not-started",
  "completed",
  "cancelled",
] as const;

// payment methods
export const PAYMENT_METHODS = ["stripe"] as const;

export type TUserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];
export type TCourseStatus = (typeof COURSE_STATUSES)[number];
export type TEnrollmentStatus = (typeof ENROLLMENT_STATUSES)[number];
export type TPaymentMethod = (typeof PAYMENT_METHODS)[number];
