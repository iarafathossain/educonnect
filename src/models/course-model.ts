import { mongooseTransform } from "@/lib/mongoose-transform.plugin";
import mongoose from "mongoose";

export interface ICourse extends mongoose.Document {
  title: string;
  subtitle?: string;
  description: string;
  image?: string;
  modules?: mongoose.Types.ObjectId[];
  price: number;
  active: boolean;
  category?: mongoose.Types.ObjectId;
  instructor?: mongoose.Types.ObjectId;
  quizSet?: mongoose.Types.ObjectId;
  testimonials?: mongoose.Types.ObjectId[];
  learning?: string[];
}

const courseSchema = new mongoose.Schema<ICourse>(
  {
    title: {
      required: true,
      type: String,
    },
    subtitle: {
      type: String,
    },
    description: {
      required: true,
      type: String,
    },
    image: {
      type: String,
    },
    modules: [{ type: mongoose.Schema.Types.ObjectId, ref: "Module" }],

    price: {
      required: true,
      default: 0,
      type: Number,
    },
    active: {
      required: true,
      default: false,
      type: Boolean,
    },

    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },

    instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    quizSet: { type: mongoose.Schema.Types.ObjectId, ref: "QuizSet" },
    testimonials: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Testimonial" },
    ],

    learning: {
      type: [String],
    },
  },
  {
    timestamps: true,
  },
);

courseSchema.plugin(mongooseTransform);

export const CourseModel =
  mongoose.models?.Course || mongoose.model("Course", courseSchema);
