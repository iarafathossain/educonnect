"use server";

import { getLoggedInUser } from "@/lib/get-loggedin-user";
import { CourseModel } from "@/models/course-model";
import { createCourse } from "@/queries/courses";

export const createCourseAction = async (data) => {
  try {
    const loggedInUser = await getLoggedInUser();

    if (!loggedInUser) {
      throw new Error("Please logged in to create a course");
    }

    // add instructor id to data
    const courseData = {
      ...data,
      instructorId: loggedInUser.id,
    };

    // call create course function
    const newCourse = await createCourse(courseData);
    return newCourse;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create course");
  }
};

export const updateCourseAction = async (courseId, data) => {
  try {
    await CourseModel.findByIdAndUpdate(courseId, data);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update course title");
  }
};
