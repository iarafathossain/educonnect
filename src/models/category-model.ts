import { mongooseTransform } from "@/lib/mongoose-transform.plugin";
import { ICategory } from "@/types/backend-index";
import mongoose from "mongoose";

const categoryModel = new mongoose.Schema<ICategory>(
  {
    label: { type: String, required: true },
    value: { type: String, required: true },
    image: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

categoryModel.plugin(mongooseTransform);

export const CategoryModel =
  mongoose.models.Category ?? mongoose.model("Category", categoryModel);
