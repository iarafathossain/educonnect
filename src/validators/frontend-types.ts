import { z } from "zod";

const dateLikeSchema = z.union([z.date(), z.string()]);

export const userRoleSchema = z.enum(["student", "instructor"]);

export const userRegisterFormSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  userRole: userRoleSchema,
  password: z.string().min(6),
});

export const socialLinksSchema = z
  .object({
    linkedin: z.string().optional(),
    twitter: z.string().optional(),
    facebook: z.string().optional(),
    instagram: z.string().optional(),
  })
  .optional();

export const userFrontendSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  role: userRoleSchema,
  phone: z.string().optional(),
  website: z.string().optional(),
  bio: z.string().optional(),
  image: z.string().optional(),
  designation: z.string().optional(),
  socialLinks: socialLinksSchema,
  createdAt: dateLikeSchema.optional(),
  updatedAt: dateLikeSchema.optional(),
});

export const moduleFrontendSchema = z.object({
  id: z.string(),
  courseId: z.string(),
  title: z.string(),
  active: z.boolean(),
  description: z.string().optional(),
  slug: z.string(),
  lessonIds: z.array(z.string()).default([]),
  duration: z.number().default(0),
  order: z.number(),
  createdAt: dateLikeSchema.optional(),
  updatedAt: dateLikeSchema.optional(),
});

export const categoryFrontendSchema = z.object({
  title: z.string(),
  icon: z.string(),
});

export const lessonFrontendSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  videoURL: z.string().optional(),
  duration: z.number().optional(),
  active: z.boolean().optional(),
  slug: z.string(),
  access: z.string().optional(),
  createdAt: dateLikeSchema.optional(),
  updatedAt: dateLikeSchema.optional(),
});

export const testimonialFrontendSchema = z.object({
  id: z.string(),
  rating: z.number(),
  content: z.string(),
  user: userFrontendSchema,
  courseId: z.string(),
  createdAt: dateLikeSchema.optional(),
  updatedAt: dateLikeSchema.optional(),
});

export const courseFrontendSchema = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string().optional(),
  description: z.string(),
  price: z.number(),
  active: z.boolean(),
  image: z.string(),
  createdAt: dateLikeSchema.optional(),
  updatedAt: dateLikeSchema.optional(),
  quizSet: z.string().optional(),
  instructor: userFrontendSchema,
  modules: z.array(moduleFrontendSchema),
  learning: z.array(z.string()).optional(),
  category: categoryFrontendSchema,
  testimonials: z.array(testimonialFrontendSchema).optional(),
});

export const personalDetailsFormDataSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email().optional(),
  designation: z.string().optional(),
  bio: z.string().optional(),
});

export const enrollmentStatusSchema = z.enum([
  "not-started",
  "completed",
  "cancelled",
]);

export const paymentMethodSchema = z.enum(["credit_card", "paypal", "stripe"]);

export const enrollmentFrontendSchema = z.object({
  id: z.string(),
  status: enrollmentStatusSchema,
  paymentMethod: paymentMethodSchema,
  createdAt: dateLikeSchema.optional(),
  updatedAt: dateLikeSchema.optional(),
  studentName: z.string().optional(),
  studentEmail: z.string().optional(),
  progress: z.number().optional(),
  quizMark: z.number().optional(),
  course: courseFrontendSchema,
  student: userFrontendSchema,
});

export const lessonPayloadSchema = z.object({
  title: z.string(),
  slug: z.string(),
  moduleId: z.string(),
  order: z.number(),
});

export const reorderItemSchema = z.object({
  id: z.string(),
  position: z.number(),
});

export const quizSetFrontendSchema = z.object({
  id: z.string(),
  title: z.string(),
  isPublished: z.boolean(),
  totalQuiz: z.number(),
});

export const quizFrontendSchema = z.object({
  id: z.string(),
  title: z.string(),
  options: z.array(
    z.object({
      text: z.string(),
      is_correct: z.boolean(),
    }),
  ),
});

export type IUserRegisterForm = z.infer<typeof userRegisterFormSchema>;
export type IUserFrontend = z.infer<typeof userFrontendSchema>;
export type IModuleFrontend = z.infer<typeof moduleFrontendSchema>;
export type ICategoryFrontend = z.infer<typeof categoryFrontendSchema>;
export type ILessonFrontend = z.infer<typeof lessonFrontendSchema>;
export type ITestimonialFrontend = z.infer<typeof testimonialFrontendSchema>;
export type ICourseFrontend = z.infer<typeof courseFrontendSchema>;
export type PersonalDetailsFormData = z.infer<
  typeof personalDetailsFormDataSchema
>;
export type IEnrollmentFrontend = z.infer<typeof enrollmentFrontendSchema>;
export type ILessonPayload = z.infer<typeof lessonPayloadSchema>;
export type IReorderItem = z.infer<typeof reorderItemSchema>;
export type IQuizSetFrontend = z.infer<typeof quizSetFrontendSchema>;
export type IQuizFrontend = z.infer<typeof quizFrontendSchema>;
