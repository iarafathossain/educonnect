import z from "zod";

export const userRegistrationValidator = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Email is not valid"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  userRole: z.enum(["student", "instructor"]).optional(),
});
