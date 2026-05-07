import * as zod from "zod";

export const liveCreateZodSchema = zod.object({
  title: zod
    .string()
    .min(1, "Title is required!")
    .max(200, "Title must be less than 200 characters!"),
  description: zod
    .string()
    .min(1, "Description is required!")
    .max(2000, "Description must be less than 2000 characters!"),
  date: zod.date({ message: "Date is required!" }),
  time: zod.string().min(1, "Time is required!"),
  thumbnail: zod.string().optional(),
  url: zod.string().optional(),
});

export const updateLiveTitleZodSchema = zod.object({
  title: zod
    .string()
    .min(1, "Title is required!")
    .max(200, "Title must be less than 200 characters!"),
});

export const updateLiveDescriptionZodSchema = zod.object({
  description: zod
    .string()
    .min(1, "Description is required!")
    .max(2000, "Description must be less than 2000 characters!"),
});

export const updateLiveDetailsZodSchema = zod.object({
  date: zod.date().optional(),
  time: zod.string().optional(),
  thumbnail: zod.string().optional(),
  url: zod.string().optional(),
});

export type CreateLivePayload = zod.infer<typeof liveCreateZodSchema>;
export type UpdateLiveTitlePayload = zod.infer<typeof updateLiveTitleZodSchema>;
export type UpdateLiveDescriptionPayload = zod.infer<
  typeof updateLiveDescriptionZodSchema
>;
export type UpdateLiveDetailsPayload = zod.infer<
  typeof updateLiveDetailsZodSchema
>;
