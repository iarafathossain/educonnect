import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
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
    thumbnail: {
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

    quizSet: { type: mongoose.Schema.Types.ObjectId, ref: "Quizset" },
    testimonials: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Testimonial" },
    ],

    learning: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

export const CourseModel =
  mongoose.models.Course ?? mongoose.model("Course", courseSchema);
