import { mongooseTransform } from "@/lib/mongoose-transform.plugin";
import mongoose from "mongoose";

export interface ITestimonialModel extends mongoose.Document {
  content: string;
  user: mongoose.Types.ObjectId;
  course: mongoose.Types.ObjectId;
  rating: number;
  createdAt?: Date;
  updatedAt?: Date;
}

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
