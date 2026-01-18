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
      }),
    );
  } catch (error) {
    throw new Error("Error reordering modules: " + error.message);
  }
};

export const updateModule = async (moduleId, data) => {
  try {
    await ModuleModel.findByIdAndUpdate(moduleId, data);
  } catch (error) {
    throw new Error("Error updating module: " + error.message);
  }
};

export const changeModulePublishState = async (moduleId) => {
  try {
    const existingModule = await modulesQueries.getModule(moduleId);
    if (!existingModule) {
      throw new Error("Module not found");
    }
    const updatedModule = await ModuleModel.findByIdAndUpdate(
      moduleId,
      {
        active: !existingModule.active,
      },
      { new: true, lean: true },
    );

    return updatedModule.active;
  } catch (error) {
    throw new Error("Error changing module publish state: " + error.message);
  }
};

export const deleteModule = async (moduleId, courseId) => {
  try {
    const existingCourse = await CourseModel.findById(courseId);
    if (!existingCourse) {
      throw new Error("Course not found");
    }
    existingCourse.modules = existingCourse.modules.filter(
      (id) => id.toString() !== moduleId,
    );
    await ModuleModel.findByIdAndDelete(moduleId);
    await existingCourse.save();
  } catch (error) {
    throw new Error("Error deleting module: " + error.message);
  }
};
