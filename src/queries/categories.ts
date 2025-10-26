import { transformMongoDoc } from "@/lib/transform-mongo-doc";
import { CategoryModel } from "@/models/category-model";
import { connectDB } from "@/services/connect-mongo";

// Fetch all categories from the database
export const getCategories = async () => {
  await connectDB();

  const categories = await CategoryModel.find().lean();

  return transformMongoDoc(categories);
};
