"use server";

import { catchError } from "@/lib/catch-error";
import { connectDB } from "@/lib/connect-mongo";
import { LessonModel } from "@/models/lesson-model";
import { ModuleModel } from "@/models/module-model";
import { create } from "@/queries/lessons";
import { IReorderItem } from "@/types/shared-index";

export const createLesson = async (payload: FormData) => {
  try {
    await connectDB();
    const title = payload.get("title");
    const slug = payload.get("slug");
    const moduleId = payload.get("moduleId");
    const order = Number(payload.get("order"));

    const createdLesson = await create({ title, slug, order });

    const moduleDetails = await ModuleModel.findById(moduleId);
    moduleDetails.lessonIds.push(createdLesson.id);
    await moduleDetails.save();

    return createdLesson;
  } catch (error) {
    throw new Error(catchError(error));
  }
};

export const reorderLessons = async (data: IReorderItem[]) => {
  await connectDB();
  try {
    await Promise.all(
      data.map(async (element) => {
        await LessonModel.findByIdAndUpdate(element.id, {
          order: element.position,
        });
      }),
    );
  } catch (error: unknown) {
    throw new Error(catchError(error));
  }
};

export const updateLesson = async <T>(
  lessonId: string,
  payload: T,
): Promise<void> => {
  await connectDB();
  try {
    await LessonModel.findByIdAndUpdate(
      lessonId,
      payload as Record<string, unknown>,
      { new: true },
    );
  } catch (error: unknown) {
    throw new Error(catchError(error));
  }
};

export const changeLessonPublishState = async (lessonId: string) => {
  await connectDB();
  try {
    const lesson = await LessonModel.findById(lessonId);
    lesson.active = !lesson.active;
    await lesson.save();
    return lesson.active;
  } catch (error: unknown) {
    throw new Error(catchError(error));
  }
};

export const deleteLesson = async (lessonId: string, moduleId: string) => {
  await connectDB();
  try {
    const existingModule = await ModuleModel.findById(moduleId);
    if (!existingModule) {
      throw new Error("Module not found");
    }
    // Remove lessonId from module's lessonIds array by filtering it out
    existingModule.lessonIds = existingModule.lessonIds.filter(
      (id: string) => id !== lessonId,
    );
    // remove the lesson document by pulling it from the database
    // existingModule.lessonIds.pull(new mongoose.Types.ObjectId(lessonId));
    await LessonModel.findByIdAndDelete(lessonId);
    await existingModule.save();
  } catch (error: unknown) {
    throw new Error(catchError(error));
  }
};
