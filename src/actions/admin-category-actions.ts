"use server";

import { actionWrapper } from "@/lib/action-wrapper";
import { connectDB } from "@/lib/connect-mongo";
import { CategoryModel } from "@/models/category-model";
import { categoryServices } from "@/services/category-services";
import { createCategoryZodSchema } from "@/validators/category-validator";
import status from "http-status";

export const createCategory = actionWrapper(async (payload: unknown) => {
  const parseData = createCategoryZodSchema.safeParse(payload);

  if (!parseData.success) {
    return {
      success: false,
      error: "Validation failed",
      statusCode: status.BAD_REQUEST,
      fieldErrors: parseData.error.flatten().fieldErrors,
    };
  }

  const created = await categoryServices.createCategory(parseData.data);

  return {
    success: true,
    message: "Category created",
    statusCode: status.CREATED,
    data: created,
  };
});

export const updateCategory = actionWrapper(
  async (categoryId: string, payload: Record<string, unknown>) => {
    await connectDB();
    const updated = await CategoryModel.findByIdAndUpdate(categoryId, payload, {
      new: true,
    });
    if (!updated) {
      return {
        success: false,
        error: "Category not found",
        statusCode: status.NOT_FOUND,
      };
    }
    return {
      success: true,
      message: "Category updated",
      statusCode: status.OK,
    };
  },
);

export const deleteCategory = actionWrapper(async (categoryId: string) => {
  await connectDB();
  const deleted = await CategoryModel.findByIdAndDelete(categoryId);
  if (!deleted) {
    return {
      success: false,
      error: "Category not found",
      statusCode: status.NOT_FOUND,
    };
  }
  return { success: true, message: "Category deleted", statusCode: status.OK };
});
