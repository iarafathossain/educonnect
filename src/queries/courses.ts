import "@/models/category-model";
import { CourseModel } from "@/models/course-model";
import "@/models/module-model";
import "@/models/testimonial-model";
import "@/models/user-model";
import { connectDB } from "@/services/connect-mongo";
import { ICourseFrontend } from "@/types/frontend-index";
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
    });

  return courses.map((course) => course.toJSON());
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
    });

  return course ? (course.toJSON() as ICourseFrontend) : null;
};

// Fetch course details by instructor
export const getCourseDetailsByInstructor = async (
  instructorId: string,
  expand?: boolean,
) => {
  await connectDB();
  const courses = await CourseModel.find({ instructor: instructorId });

  const enrollments = await Promise.all(
    courses.map(async (course) => {
      const enrollment = await getEnrollmentsForCourse(course.id);
      return enrollment;
    }),
  );

  const totalEnrollments = enrollments.reduce((acc, curr) => {
    return acc + curr.length;
  }, 0);

  const testimonials = await Promise.all(
    courses.map(async (course) => {
      const testimonial = await getTestimonialsForCourse(course.id);
      return testimonial;
    }),
  );

  const totalTestimonials = testimonials.flat() ?? [];
  const avgRating =
    totalTestimonials.reduce(function (acc, obj) {
      return acc + obj.rating;
    }, 0) / totalTestimonials.length;

  const groupByCourse = Object.groupBy(enrollments.flat(), (enrollment) =>
    enrollment.course.toString(),
  );
  const totalRevenue = courses.reduce((acc, course) => {
    return acc + (groupByCourse[course.id]?.length ?? 0) * course.price;
  }, 0);

  if (expand) {
    return {
      courses: courses.map((course) => course.toJSON()),
      enrollments: enrollments.flat(),
      reviews: totalTestimonials,
    };
  }

  return {
    courses: courses.length,
    enrollments: totalEnrollments,
    reviews: totalTestimonials.length,
    ratings: avgRating.toPrecision(2),
    revenue: totalRevenue,
  };
};

// create a new course
export const createCourse = async (data: Partial<ICourseFrontend>) => {
  await connectDB();
  const newCourse = await CourseModel.create(data);

  return newCourse.toJSON();
};
