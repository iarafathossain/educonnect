import * as zod from "zod";

export const updateCategoryZodSchema = zod.object({
  value: zod.string().min(1, "Category is required!"),
});

export type UpdateCategoryPayload = zod.infer<typeof updateCategoryZodSchema>;
