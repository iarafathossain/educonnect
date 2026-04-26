import { AppError } from "@/lib/app-error";
import { connectDB } from "@/lib/connect-mongo";
import { LessonModel } from "@/models/lesson-model";
import { ModuleModel } from "@/models/module-model";
import {
  TLessonCreatePayload,
  TLessonDeletePayload,
  TLessonReorderPayload,
  TLessonUpdatePayload,
} from "@/validators/lesson-validator";
import status from "http-status";

export const lessonServices = {
  getLesson: async (id: string) => {
    await connectDB();
    const lesson = await LessonModel.findById(id);
    return lesson ? lesson.toJSON() : null;
  },

  create: async (payload: TLessonCreatePayload) => {
    await connectDB();

    const { moduleId, ...lessonData } = payload;
    const moduleDetails = await ModuleModel.findById(moduleId);

    if (!moduleDetails) {
      throw new AppError("Module not found", status.NOT_FOUND);
    }

    const createdLesson = await LessonModel.create(lessonData);
    moduleDetails.lessonIds.push(createdLesson.id);
    await moduleDetails.save();

    return createdLesson.toJSON();
  },

  reorder: async (payload: TLessonReorderPayload) => {
    await connectDB();

    await Promise.all(
      payload.map(async (element) => {
        await LessonModel.findByIdAndUpdate(element.id, {
          order: element.position,
        });
      }),
    );
  },

  update: async (lessonId: string, payload: TLessonUpdatePayload) => {
    await connectDB();

    const updatedLesson = await LessonModel.findByIdAndUpdate(
      lessonId,
      payload,
      {
        new: true,
      },
    );

    if (!updatedLesson) {
      throw new AppError("Lesson not found", status.NOT_FOUND);
    }

    return updatedLesson.toJSON();
  },

  changePublishState: async (lessonId: string) => {
    await connectDB();

    const lesson = await LessonModel.findById(lessonId);

    if (!lesson) {
      throw new AppError("Lesson not found", status.NOT_FOUND);
    }

    lesson.active = !lesson.active;
    await lesson.save();

    return lesson.active;
  },

  delete: async (payload: TLessonDeletePayload) => {
    await connectDB();

    const existingModule = await ModuleModel.findById(payload.moduleId);
    if (!existingModule) {
      throw new AppError("Module not found", status.NOT_FOUND);
    }

    const existingLesson = await LessonModel.findById(payload.lessonId);
    if (!existingLesson) {
      throw new AppError("Lesson not found", status.NOT_FOUND);
    }

    existingModule.lessonIds = existingModule.lessonIds.filter(
      (id: string) => String(id) !== String(payload.lessonId),
    );

    await LessonModel.findByIdAndDelete(payload.lessonId);
    await existingModule.save();
  },
};

export const getLesson = lessonServices.getLesson;
export const createLesson = lessonServices.create;
export const reorderLessons = lessonServices.reorder;
export const updateLesson = lessonServices.update;
export const changeLessonPublishState = lessonServices.changePublishState;
export const deleteLesson = lessonServices.delete;
