import { CourseModel } from "@/models/course-model";
import { connectDB } from "@/services/connect-mongo";

import "@/models/category-model";
import "@/models/module-model";
import "@/models/testimonial-model";
import "@/models/user-model";

export const getCourses = async () => {
  await connectDB();

  const courses = await CourseModel.find()
    .populate({
      path: "instructor",
      model: "User",
    })
    .populate({
      path: "category",
      model: "Category",
    })
    .populate({
      path: "modules",
      model: "Module",
    })
    .populate({
      path: "testimonials",
      model: "Testimonial",
    })
    .lean();

  return courses;
};
