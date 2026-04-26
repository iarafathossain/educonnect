import { z } from "zod";

export const personalDetailsFormZodSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required")
    .max(100, "First name must be less than 100 characters"),
  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .max(100, "Last name must be less than 100 characters"),
  email: z
    .string()
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters"),
  designation: z
    .string()
    .trim()
    .max(150, "Occupation must be less than 150 characters")
    .optional()
    .or(z.literal("")),
  bio: z
    .string()
    .trim()
    .max(300, "Bio cannot exceed 300 characters")
    .optional()
    .or(z.literal("")),
  image: z
    .string()
    .trim()
    .max(255, "Image URL must be less than 255 characters")
    .optional()
    .or(z.literal("")),
});

export const personalDetailsUpdateZodSchema = personalDetailsFormZodSchema
  .pick({
    firstName: true,
    lastName: true,
    designation: true,
    bio: true,
    image: true,
  })
  .partial();

export type TPersonalDetailsForm = z.infer<typeof personalDetailsFormZodSchema>;
export type TPersonalDetailsUpdate = z.infer<
  typeof personalDetailsUpdateZodSchema
>;

export const contactInfoFormZodSchema = z.object({
  phone: z
    .string()
    .trim()
    .regex(/^[0-9]+$/, "Invalid phone number")
    .min(10, "Phone number must be at least 10 digits")
    .max(11, "Phone number cannot exceed 11 digits"),
  website: z
    .string()
    .trim()
    .max(255, "Website URL must be less than 255 characters")
    .optional()
    .or(z.literal("")),
  facebook: z
    .string()
    .trim()
    .max(255, "Facebook URL must be less than 255 characters")
    .optional()
    .or(z.literal("")),
  twitter: z
    .string()
    .trim()
    .max(255, "Twitter URL must be less than 255 characters")
    .optional()
    .or(z.literal("")),
  linkedin: z
    .string()
    .trim()
    .max(255, "LinkedIn URL must be less than 255 characters")
    .optional()
    .or(z.literal("")),
});

export const contactInfoUpdateZodSchema = contactInfoFormZodSchema.partial();

export type TContactInfoForm = z.infer<typeof contactInfoFormZodSchema>;
export type TContactInfoUpdate = z.infer<typeof contactInfoUpdateZodSchema>;

export const changePasswordFormZodSchema = z
  .object({
    oldPassword: z
      .string()
      .min(6, "Old password must be at least 6 characters long")
      .max(255, "Old password must be less than 255 characters"),
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters long")
      .max(255, "New password must be less than 255 characters"),
    retypeNewPassword: z
      .string()
      .min(6, "Please re-type the new password")
      .max(255, "Re-typed password must be less than 255 characters"),
  })
  .refine((data) => data.newPassword === data.retypeNewPassword, {
    message: "Passwords do not match",
    path: ["retypeNewPassword"],
  });

export const changePasswordPayloadZodSchema = changePasswordFormZodSchema.pick({
  oldPassword: true,
  newPassword: true,
});

export type TChangePasswordForm = z.infer<typeof changePasswordFormZodSchema>;
export type TChangePasswordPayload = z.infer<
  typeof changePasswordPayloadZodSchema
>;
