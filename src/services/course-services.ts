import { AppError } from "@/lib/app-error";
import { connectDB } from "@/lib/connect-mongo";
import "@/models/category-model";
import { CourseModel } from "@/models/course-model";
import "@/models/module-model";
import "@/models/testimonial-model";
import "@/models/user-model";
import { getEnrollmentsForCourse } from "@/services/enrollment-services";
import { getTestimonialsForCourse } from "@/services/testimonial-services";
import { ICourseFrontend } from "@/types/frontend-index";
import { CreateCoursePayload } from "@/validators/course-validator";
import status from "http-status";

export const courseServices = {
  getCourses: async () => {
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
  },

  getCourse: async (id: string) => {
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
  },

  getCourseDetailsByInstructor: async (
    instructorId: string,
    expand?: boolean,
  ) => {
    await connectDB();
    const courses = await CourseModel.find({ instructor: instructorId });
    console.log("Courses:", courses);

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
  },

  create: async (payload: CreateCoursePayload, instructorId: string) => {
    const courseData = {
      ...payload,
      instructor: instructorId,
    };

    const newCourse = await CourseModel.create(courseData);
    return newCourse.toJSON();
  },

  update: async (courseId: string, payload: Record<string, unknown>) => {
    const updatedCourse = await CourseModel.findByIdAndUpdate(
      courseId,
      payload,
      {
        new: true,
      },
    );

    if (!updatedCourse) {
      throw new AppError("Course not found", status.NOT_FOUND);
    }

    return updatedCourse.toJSON();
  },

  changePublishState: async (courseId: string) => {
    const course = await CourseModel.findById(courseId);

    if (!course) {
      throw new AppError("Course not found", status.NOT_FOUND);
    }

    course.active = !course.active;
    await course.save();

    return course.active;
  },

  delete: async (courseId: string) => {
    const deletedCourse = await CourseModel.findByIdAndDelete(courseId);

    if (!deletedCourse) {
      throw new AppError("Course not found", status.NOT_FOUND);
    }
  },
};

export const getCourses = courseServices.getCourses;
export const getCourse = courseServices.getCourse;
export const getCourseDetailsByInstructor =
  courseServices.getCourseDetailsByInstructor;
export const createCourse = courseServices.create;
