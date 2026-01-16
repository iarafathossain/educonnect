import { transformMongoDoc } from "@/lib/transform-mongo-doc";
import { LessonModel } from "@/models/lesson-model";
import { connectDB } from "@/services/connect-mongo";

export const getLesson = async (id: string) => {
  await connectDB();
  const lesson = await LessonModel.findById(id).lean();
  return transformMongoDoc(lesson);
};

export const create = async (data) => {
  try {
    await connectDB();
    const lesson = await LessonModel.create(data);
    return JSON.parse(JSON.stringify(lesson));
  } catch (err) {
    console.error("Error creating lesson:", err);
    throw new Error(err);
  }
};
