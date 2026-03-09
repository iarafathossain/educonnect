"use server";

import { getLoggedInUser } from "@/lib/get-loggedin-user";
import { CourseModel } from "@/models/course-model";
import { createCourse } from "@/queries/courses";
import { CreateCoursePayload } from "@/validators/course-validator";

export const createCourseAction = async (payload: CreateCoursePayload) => {
  try {
    const loggedInUser = await getLoggedInUser();

    if (!loggedInUser) {
      throw new Error("Please logged in to create a course");
    }

    // add instructor id to data
    const courseData = {
      ...payload,
      instructor: loggedInUser.id,
    };

    // call create course function
    const newCourse = await createCourse(courseData);
    return newCourse;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create course");
  }
};

export const updateCourseAction = async <T>(
  courseId: string,
  payload: T,
): Promise<void> => {
  try {
    await CourseModel.findByIdAndUpdate(
      courseId,
      payload as Record<string, unknown>,
      { new: true },
    );
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update course");
  }
};

export const changeCoursePublishState = async (courseId: string) => {
  try {
    const course = await CourseModel.findById(courseId);
    if (!course) {
      throw new Error("Course not found");
    }
    course.active = !course.active;
    await course.save();
    return course.active;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to change course publish state");
  }
};

export const deleteCourse = async (courseId: string) => {
  try {
    await CourseModel.findByIdAndDelete(courseId);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete course");
  }
};
