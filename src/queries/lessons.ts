import { transformMongoDoc } from "@/lib/transform-mongo-doc";
import { LessonModel } from "@/models/lesson-model";
import { connectDB } from "@/services/connect-mongo";

export const getLesson = async (id: string) => {
  await connectDB();
  const lesson = await LessonModel.findById(id).lean();
  return transformMongoDoc(lesson);
};
