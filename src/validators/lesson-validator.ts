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

export type TLessonCreatePayload = z.infer<typeof lessonCreateZodSchema>;
export type TLessonReorderPayload = z.infer<typeof lessonReorderZodSchema>;