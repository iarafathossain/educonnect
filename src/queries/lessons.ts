import { connectDB } from "@/lib/connect-mongo";
import { LessonModel } from "@/models/lesson-model";

export const getLesson = async (id: string) => {
  await connectDB();
  const lesson = await LessonModel.findById(id);
  return lesson ? lesson.toJSON() : null;
};

export const create = async (data) => {
  try {
    await connectDB();
    const lesson = await LessonModel.create(data);
    return lesson.toJSON();
  } catch (err) {
    throw new Error(err);
  }
};
