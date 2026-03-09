"use server";

import { catchError } from "@/lib/catch-error";
import { CourseModel } from "@/models/course-model";
import { ModuleModel } from "@/models/module-model";
import { createModule, getModule } from "@/queries/modules";
import { IModuleFrontend } from "@/types/frontend-index";
import { IReorderItem } from "@/types/shared-index";

export const createModuleAction = async (payload: FormData) => {
  try {
    const title = payload.get("title") as string;
    const courseId = payload.get("courseId") as string;
    const slug = payload.get("slug") as string;
    const order = Number(payload.get("order"));

    const createdModule = await createModule({
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
    course.modules.push(createdModule.id);
    await course.save();
    return createdModule;
  } catch (error: unknown) {
    throw new Error(catchError(error));
  }
};

export const reorderModules = async (data: IReorderItem[]) => {
  try {
    await Promise.all(
      data.map(async (module) => {
        await ModuleModel.findByIdAndUpdate(module.id, {
          order: module.position,
        });
      }),
    );
  } catch (error: unknown) {
    throw new Error(catchError(error));
  }
};

export const updateModule = async (
  moduleId: string,
  data: Partial<IModuleFrontend>,
) => {
  try {
    await ModuleModel.findByIdAndUpdate(moduleId, data);
  } catch (error: unknown) {
    throw new Error(catchError(error));
  }
};

export const changeModulePublishState = async (moduleId: string) => {
  try {
    const existingModule = await getModule(moduleId);
    if (!existingModule) {
      throw new Error("Module not found");
    }
    const updatedModule = (await ModuleModel.findByIdAndUpdate(
      moduleId,
      {
        active: !existingModule.active,
      },
      { new: true, lean: true },
    )) as IModuleFrontend | null;

    return updatedModule?.active;
  } catch (error: unknown) {
    throw new Error(catchError(error));
  }
};

export const deleteModule = async (moduleId: string, courseId: string) => {
  try {
    const existingCourse = await CourseModel.findById(courseId);
    if (!existingCourse) {
      throw new Error("Course not found");
    }
    existingCourse.modules = existingCourse.modules.filter(
      (id: string) => id !== moduleId,
    );
    await ModuleModel.findByIdAndDelete(moduleId);
    await existingCourse.save();
  } catch (error: unknown) {
    throw new Error(catchError(error));
  }
};
