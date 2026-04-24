import { catchError } from "@/lib/catch-error";
import { connectDB } from "@/lib/connect-mongo";
import "@/models/lesson-model";
import { ModuleModel } from "@/models/module-model";

export const createModule = async (data) => {
  try {
    await connectDB();
    const newModule = await ModuleModel.create(data);
    return newModule.toJSON();
  } catch (error: unknown) {
    throw new Error(catchError(error));
  }
};

export const getModule = async (moduleId: string) => {
  try {
    await connectDB();
    const result = await ModuleModel.findById(moduleId).populate({
      path: "lessonIds",
      model: "Lesson",
    });

    return result ? result.toJSON() : null;
  } catch (error: unknown) {
    throw new Error(catchError(error));
  }
};
