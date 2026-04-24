import { connectDB } from "@/lib/connect-mongo";
import { CategoryModel } from "@/models/category-model";

// Fetch all categories from the database
export const getCategories = async () => {
  await connectDB();

  const categories = await CategoryModel.find();

  return categories.map((category) => category.toJSON());
};

// Fetch a single category by its ID
export const getCategoryById = async (categoryId: string) => {
  await connectDB();

  const category = await CategoryModel.findById(categoryId);

  return category ? category.toJSON() : null;
};
