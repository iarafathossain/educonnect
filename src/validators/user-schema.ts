import { USER_ROLES } from "@/constants/enums";
import { z } from "zod";

export const userRegistrationZodSchema = z
  .object({
    firstName: z
      .string()
      .min(1, "First name is required!")
      .max(100, "First name must be less than 100 characters!"),
    lastName: z
      .string()
      .min(1, "Last name is required!")
      .max(100, "Last name must be less than 100 characters!"),
    email: z
      .string()
      .email("Invalid email address!")
      .max(255, "Email must be less than 255 characters!"),
    role: z.enum(USER_ROLES, "Invalid user role!"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters!")
      .max(255, "Password must be less than 255 characters!"),
    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters!"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match!",
    path: ["confirmPassword"],
  });

export type TUserRegistration = z.infer<typeof userRegistrationZodSchema>;
