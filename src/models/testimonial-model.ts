import { mongooseTransform } from "@/lib/mongoose-transform.plugin";
import { ITestimonial } from "@/types/backend-index";
import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema<ITestimonial>({
  content: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

testimonialSchema.plugin(mongooseTransform);

export const TestimonialModel =
  mongoose.models.Testimonial ??
  mongoose.model("Testimonial", testimonialSchema);
