import { z } from "zod";

export const quizSetCreateZodSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters"),
});

export type TQuizSetCreatePayload = z.infer<typeof quizSetCreateZodSchema>;

export const quizSetUpdateZodSchema = quizSetCreateZodSchema;

const quizOptionZodSchema = z.object({
  label: z
    .string({
      message: "Option label is required",
    })
    .min(1, {
      message: "Option label is required",
    }),
  isTrue: z.boolean().default(false),
});

export const quizCreateInSetZodSchema = z
  .object({
    title: z
      .string({
        message: "Question is required",
      })
      .min(1, {
        message: "Title is required",
      }),
    description: z
      .string({
        message: "Description is required",
      })
      .min(1, {
        message: "Description is required",
      }),
    optionA: quizOptionZodSchema,
    optionB: quizOptionZodSchema,
    optionC: quizOptionZodSchema,
    optionD: quizOptionZodSchema,
  })
  .refine(
    (value) =>
      value.optionA.isTrue ||
      value.optionB.isTrue ||
      value.optionC.isTrue ||
      value.optionD.isTrue,
    {
      message: "Please select at least one correct option.",
    },
  );

export type TQuizSetUpdatePayload = z.infer<typeof quizSetUpdateZodSchema>;
export type TQuizCreateInSetPayload = z.infer<typeof quizCreateInSetZodSchema>;
