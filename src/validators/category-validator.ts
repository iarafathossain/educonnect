import * as zod from "zod";

export const createCategoryZodSchema = zod.object({
  title: zod.string().min(1, "Category title is required!"),
  icon: zod.string().min(1, "Category icon is required!"),
});

export const updateCategoryZodSchema = zod.object({
  value: zod.string().min(1, "Category is required!"),
});

export type CreateCategoryPayload = zod.infer<typeof createCategoryZodSchema>;
export type UpdateCategoryPayload = zod.infer<typeof updateCategoryZodSchema>;
