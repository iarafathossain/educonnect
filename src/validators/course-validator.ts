import * as zod from "zod";

export const courseCreateZodSchema = zod.object({
  title: zod
    .string()
    .min(1, "Title is required!")
    .max(200, "Title must be less than 200 characters!"),
  description: zod
    .string()
    .min(1, "Description is required!")
    .max(2000, "Description must be less than 2000 characters!"),
});

export const updateCourseTitleZodSchema = zod.object({
  title: zod
    .string()
    .min(1, "Title is required!")
    .max(200, "Title must be less than 200 characters!"),
});

export const updateCourseDescriptionZodSchema = zod.object({
  description: zod
    .string()
    .min(1, "Description is required!")
    .max(2000, "Description must be less than 2000 characters!"),
});

export const updateCourseImageZodSchema = zod.object({
  imageUrl: zod.string().min(1, "Image URL is required!"),
});

export type CreateCoursePayload = zod.infer<typeof courseCreateZodSchema>;
export type UpdateCourseTitlePayload = zod.infer<
  typeof updateCourseTitleZodSchema
>;
export type UpdateCourseDescriptionPayload = zod.infer<
  typeof updateCourseDescriptionZodSchema
>;
export type UpdateCourseImagePayload = zod.infer<
  typeof updateCourseImageZodSchema
>;
