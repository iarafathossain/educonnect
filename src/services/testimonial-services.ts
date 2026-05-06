import { connectDB } from "@/lib/connect-mongo";
import { TestimonialModel } from "@/models/testimonial-model";

type TAdminTestimonialRow = {
  id: string;
  content: string;
  rating: number;
  userName: string;
  courseTitle: string;
};

export const testimonialServices = {
  getTestimonialsForCourse: async (courseId: string) => {
    await connectDB();

    const testimonials = await TestimonialModel.find({ course: courseId });
    return testimonials.map((testimonial) => testimonial.toJSON());
  },

  getAllTestimonialsForAdmin: async (): Promise<TAdminTestimonialRow[]> => {
    await connectDB();

    const testimonials = await TestimonialModel.find()
      .populate({
        path: "user",
        model: "User",
        select: "firstName lastName",
      })
      .populate({
        path: "course",
        model: "Course",
        select: "title",
      });

    return testimonials.map((testimonial) => {
      const row = testimonial.toJSON() as {
        id: string;
        content: string;
        rating: number;
        user?: { firstName?: string; lastName?: string };
        course?: { title?: string };
      };

      return {
        id: row.id,
        content: row.content,
        rating: row.rating,
        userName:
          `${row.user?.firstName ?? ""} ${row.user?.lastName ?? ""}`.trim() ||
          "Unknown",
        courseTitle: row.course?.title ?? "Unknown",
      };
    });
  },
};

export const getTestimonialsForCourse =
  testimonialServices.getTestimonialsForCourse;
export const getAllTestimonialsForAdmin =
  testimonialServices.getAllTestimonialsForAdmin;
