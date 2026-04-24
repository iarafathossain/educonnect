import { z } from "zod";

export const lessonCreateZodSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters"),
  slug: z.string().trim().min(1, "Slug is required"),
  moduleId: z.string().min(1, "Module id is required"),
  order: z.number().int().min(0, "Order cannot be negative"),
});

export const lessonReorderItemZodSchema = z.object({
  id: z.string().min(1, "Lesson id is required"),
  position: z.number().int().min(0, "Position cannot be negative"),
});

export const lessonReorderZodSchema = z.array(lessonReorderItemZodSchema);

export const lessonUpdateZodSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, "Title is required")
      .max(200, "Title must be less than 200 characters")
      .optional(),
    slug: z.string().trim().min(1, "Slug is required").optional(),
    description: z.string().trim().min(1, "Description is required").optional(),
    isFree: z.boolean().optional(),
    access: z.enum(["public", "private"]).optional(),
    videoURL: z.string().trim().min(1, "Video URL is required").optional(),
    duration: z.number().int().min(0, "Duration cannot be negative").optional(),
    active: z.boolean().optional(),
  })
  .refine((value) => Object.keys(value).length > 0, {
    message: "At least one field is required",
  });

export const lessonDeleteZodSchema = z.object({
  lessonId: z.string().min(1, "Lesson id is required"),
  moduleId: z.string().min(1, "Module id is required"),
});

export type TLessonCreatePayload = z.infer<typeof lessonCreateZodSchema>;
export type TLessonReorderPayload = z.infer<typeof lessonReorderZodSchema>;
export type TLessonUpdatePayload = z.infer<typeof lessonUpdateZodSchema>;
export type TLessonDeletePayload = z.infer<typeof lessonDeleteZodSchema>;
