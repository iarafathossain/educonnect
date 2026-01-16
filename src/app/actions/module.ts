"use server";

import { CourseModel } from "@/models/course-model";
import { ModuleModel } from "@/models/module-model";
import { modulesQueries } from "@/queries/modules";

export const createModule = async (data: FormData) => {
  try {
    const title = data.get("title") as string;
    const courseId = data.get("courseId") as string;
    const slug = data.get("slug") as string;
    const order = Number(data.get("order"));

    const createdModule = await modulesQueries.create({
      title,
      course: courseId,
      slug,
      order,
      lessonIds: [],
    });

    const course = await CourseModel.findById(courseId);
    if (!course) {
      throw new Error("Course not found");
    }
    course.modules.push(createdModule._id);
    await course.save();
    return createdModule;
  } catch (error) {
    console.error("Error creating module:", error);
  }
};

export const reorderModules = async (data) => {
  try {
    await Promise.all(
      data.map(async (module) => {
        await ModuleModel.findByIdAndUpdate(module._id, {
          order: module.position,
        });
      })
    );
  } catch (error) {
    throw new Error("Error reordering modules: " + error.message);
  }
};
