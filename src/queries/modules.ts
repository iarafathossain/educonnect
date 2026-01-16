import "@/models/lesson-model";
import { ModuleModel } from "@/models/module-model";
import { connectDB } from "@/services/connect-mongo";

const create = async (data) => {
  try {
    await connectDB();
    const newModule = await ModuleModel.create(data);
    return JSON.parse(JSON.stringify(newModule));
  } catch (error) {
    throw new Error("Error creating module");
  }
};

const getModule = async (moduleId) => {
  try {
    await connectDB();
    const result = await ModuleModel.findById(moduleId)
      .populate({
        path: "lessonIds",
        model: "Lesson",
      })
      .lean();

    return JSON.parse(JSON.stringify(result));
  } catch (e) {
    throw new Error(e);
  }
};

export const modulesQueries = {
  create,
  getModule,
};
