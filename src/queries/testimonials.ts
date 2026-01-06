import { TestimonialModel } from "@/models/testimonial-model";
import { connectDB } from "@/services/connect-mongo";

import { transformMongoDoc } from "@/lib/transform-mongo-doc";

// Fetch all testimonials for a specific course
export const getTestimonialsForCourse = async (courseId: string) => {
  console.log({ id: courseId });
  await connectDB();

  const testimonials = await TestimonialModel.find({ course: courseId }).lean();
  console.log("Testimonials********* from testimonials query");
  console.log(testimonials);

  return transformMongoDoc(testimonials);
};
