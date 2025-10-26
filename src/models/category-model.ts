import { ICategory } from "@/types/backend-index";
import mongoose from "mongoose";

const categoryModel = new mongoose.Schema<ICategory>(
  {
    title: { type: String, required: true },
    description: { type: String },
    thumbnailUrl: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const CategoryModel =
  (mongoose.models.Category as mongoose.Model<ICategory>) ||
  mongoose.model<ICategory>("Category", categoryModel);
