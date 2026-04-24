import { z } from "zod";

export const moduleCreateZodSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters"),
  courseId: z.string().min(1, "Course id is required"),
  slug: z.string().trim().min(1, "Slug is required"),
  order: z.number().int().min(0, "Order cannot be negative"),
});

export const moduleReorderItemZodSchema = z.object({
  id: z.string().min(1, "Module id is required"),
  position: z.number().int().min(0, "Position cannot be negative"),
});

export const moduleReorderZodSchema = z.array(moduleReorderItemZodSchema);

export const moduleUpdateZodSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, "Title is required")
      .max(200, "Title must be less than 200 characters")
      .optional(),
    slug: z.string().trim().min(1, "Slug is required").optional(),
    active: z.boolean().optional(),
  })
  .refine((value) => Object.keys(value).length > 0, {
    message: "At least one field is required",
  });

export const moduleDeleteZodSchema = z.object({
  moduleId: z.string().min(1, "Module id is required"),
  courseId: z.string().min(1, "Course id is required"),
});

export type TModuleCreatePayload = z.infer<typeof moduleCreateZodSchema>;
export type TModuleReorderPayload = z.infer<typeof moduleReorderZodSchema>;
export type TModuleUpdatePayload = z.infer<typeof moduleUpdateZodSchema>;
export type TModuleDeletePayload = z.infer<typeof moduleDeleteZodSchema>;
