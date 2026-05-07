import { connectDB } from "@/lib/connect-mongo";
import { CategoryModel } from "@/models/category-model";
import { CreateCategoryPayload } from "@/validators/category-validator";

export const categoryServices = {
  createCategory: async (payload: CreateCategoryPayload) => {
    await connectDB();

    const category = await CategoryModel.create(payload);
    return category.toJSON();
  },

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

export const createCategory = categoryServices.createCategory;
export const getCategories = categoryServices.getCategories;
export const getCategoryById = categoryServices.getCategoryById;
