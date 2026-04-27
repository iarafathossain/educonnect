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

export const userLoginZodSchema = z.object({
  email: z
    .string()
    .email("Invalid email address!")
    .max(255, "Email must be less than 255 characters!"),
  password: z
    .string()
    .min(1, "Password is required!")
    .max(255, "Password must be less than 255 characters!"),
});

export type TUserLogin = z.infer<typeof userLoginZodSchema>;

export const socialLinksSchema = z
  .object({
    linkedin: z.string().optional(),
    twitter: z.string().optional(),
    facebook: z.string().optional(),
    instagram: z.string().optional(),
  })
  .optional();

const dateLikeSchema = z.union([z.date(), z.string()]);

export const userFrontendSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  role: z.enum(USER_ROLES),
  phone: z.string().optional(),
  website: z.string().optional(),
  bio: z.string().optional(),
  image: z.string().optional(),
  designation: z.string().optional(),
  socialLinks: socialLinksSchema,
  createdAt: dateLikeSchema.optional(),
  updatedAt: dateLikeSchema.optional(),
});

export type IUserFrontend = z.infer<typeof userFrontendSchema>;
