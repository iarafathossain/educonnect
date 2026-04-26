import { AppError } from "@/lib/app-error";
import { CourseModel } from "@/models/course-model";
import { ModuleModel } from "@/models/module-model";
import {
  TModuleCreatePayload,
  TModuleReorderPayload,
  TModuleUpdatePayload,
} from "@/validators/module-validator";
import status from "http-status";

export const moduleServices = {
  getModule: async (moduleId: string) => {
    const result = await ModuleModel.findById(moduleId).populate({
      path: "lessonIds",
      model: "Lesson",
    });

    return result ? result.toJSON() : null;
  },

  create: async (payload: TModuleCreatePayload) => {
    const { courseId, ...moduleData } = payload;

    const course = await CourseModel.findById(courseId);
    if (!course) {
      throw new AppError("Course not found", status.NOT_FOUND);
    }

    const createdModule = await ModuleModel.create({
      ...moduleData,
      course: courseId,
      lessonIds: [],
    });

    course.modules.push(createdModule.id);
    await course.save();

    return createdModule.toJSON();
  },

  reorder: async (payload: TModuleReorderPayload) => {
    await Promise.all(
      payload.map(async (item) => {
        await ModuleModel.findByIdAndUpdate(item.id, { order: item.position });
      }),
    );
  },

  update: async (moduleId: string, payload: TModuleUpdatePayload) => {
    const updatedModule = await ModuleModel.findByIdAndUpdate(
      moduleId,
      payload,
      {
        new: true,
      },
    );

    if (!updatedModule) {
      throw new AppError("Module not found", status.NOT_FOUND);
    }

    return updatedModule.toJSON();
  },

  changePublishState: async (moduleId: string) => {
    const existingModule = await ModuleModel.findById(moduleId);

    if (!existingModule) {
      throw new AppError("Module not found", status.NOT_FOUND);
    }

    existingModule.active = !existingModule.active;
    await existingModule.save();

    return existingModule.active;
  },

  delete: async (moduleId: string, courseId: string) => {
    const course = await CourseModel.findById(courseId);

    if (!course) {
      throw new AppError("Course not found", status.NOT_FOUND);
    }

    const existingModule = await ModuleModel.findById(moduleId);
    if (!existingModule) {
      throw new AppError("Module not found", status.NOT_FOUND);
    }

    course.modules = course.modules.filter(
      (id: string) => String(id) !== String(moduleId),
    );

    await ModuleModel.findByIdAndDelete(moduleId);
    await course.save();
  },
};

export const getModule = moduleServices.getModule;
export const createModule = moduleServices.create;
export const reorderModules = moduleServices.reorder;
export const updateModule = moduleServices.update;
export const changeModulePublishState = moduleServices.changePublishState;
export const deleteModule = moduleServices.delete;
