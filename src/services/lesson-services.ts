import { AppError } from "@/lib/app-error";
import { connectDB } from "@/lib/connect-mongo";
import { LessonModel } from "@/models/lesson-model";
import { ModuleModel } from "@/models/module-model";
import {
  TLessonCreatePayload,
  TLessonReorderPayload,
} from "@/validators/lesson-validator";
import status from "http-status";

export const lessonServices = {
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
};
