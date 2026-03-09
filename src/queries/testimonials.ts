import { TestimonialModel } from "@/models/testimonial-model";
import { connectDB } from "@/services/connect-mongo";

// Fetch all testimonials for a specific course
export const getTestimonialsForCourse = async (courseId: string) => {
  await connectDB();

  const testimonials = await TestimonialModel.find({ course: courseId });
  return testimonials.map((testimonial) => testimonial.toJSON());
};
