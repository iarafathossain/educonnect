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

export const modulesQueries = {
  create,
};
