import { connectDB } from "@/lib/connect-mongo";
import { TestimonialModel } from "@/models/testimonial-model";

export const testimonialServices = {
	getTestimonialsForCourse: async (courseId: string) => {
		await connectDB();

		const testimonials = await TestimonialModel.find({ course: courseId });
		return testimonials.map((testimonial) => testimonial.toJSON());
	},
};

export const getTestimonialsForCourse = testimonialServices.getTestimonialsForCourse;