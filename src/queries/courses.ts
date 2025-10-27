import { CourseModel } from "@/models/course-model";
import { connectDB } from "@/services/connect-mongo";

import { transformMongoDoc } from "@/lib/transform-mongo-doc";
import "@/models/category-model";
import "@/models/module-model";
import "@/models/testimonial-model";
import "@/models/user-model";
import { getEnrollmentsForCourse } from "./enrollments";
import { getTestimonialsForCourse } from "./testimonials";

// Fetch all courses from the database
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

  return transformMongoDoc(courses);
};

// Fetch single course from the database
export const getCourse = async (id: string) => {
  await connectDB();

  const course = await CourseModel.findById(id)
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
      populate: {
        path: "user",
        model: "User",
      },
    })
    .lean();

  return transformMongoDoc(course);
};

// Fetch course details by instructor
export const getCourseDetailsByInstructor = async (instructorId: string) => {
  await connectDB();
  const courses = await CourseModel.find({ instructor: instructorId }).lean();

  const enrollments = await Promise.all(
    courses.map(async (course) => {
      const enrollment = await getEnrollmentsForCourse(course._id.toString());
      return enrollment;
    })
  );

  const totalEnrollments = enrollments.reduce((acc, currentValue) => {
    return acc + currentValue.length;
  }, 0);

  const testimonials = await Promise.all(
    courses.map(async (course) => {
      const testimonial = await getTestimonialsForCourse(course._id.toString());
      return testimonial;
    })
  );

  const totalTestimonials = testimonials.flat();
  const avgRating =
    totalTestimonials.reduce(function (acc, obj) {
      return acc + obj.rating;
    }, 0) / totalTestimonials.length;

  return {
    courses: courses.length,
    enrollments: totalEnrollments,
    reviews: totalTestimonials.length,
    ratings: avgRating.toPrecision(2),
  };
};
