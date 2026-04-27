import { mongooseTransform } from "@/lib/mongoose-transform.plugin";
import { ITestimonial } from "@/types/backend-index";
import mongoose from "mongoose";

export interface ITestimonialModel extends mongoose.Document, ITestimonial {}

const testimonialSchema = new mongoose.Schema<ITestimonialModel>(
  {
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
  },
  { timestamps: true },
);

testimonialSchema.plugin(mongooseTransform);

export const TestimonialModel =
  mongoose.models?.Testimonial ||
  mongoose.model("Testimonial", testimonialSchema);
