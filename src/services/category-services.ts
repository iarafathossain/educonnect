import { connectDB } from "@/lib/connect-mongo";
import { CategoryModel } from "@/models/category-model";

export const categoryServices = {
  getCategories: async () => {
    await connectDB();

    const categories = await CategoryModel.find();
    return categories.map((category) => category.toJSON());
  },

  getCategoryById: async (categoryId: string) => {
    await connectDB();

    const category = await CategoryModel.findById(categoryId);
    return category ? category.toJSON() : null;
  },
};

export const getCategories = categoryServices.getCategories;
export const getCategoryById = categoryServices.getCategoryById;
