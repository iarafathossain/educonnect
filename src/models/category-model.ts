import { mongooseTransform } from "@/lib/mongoose-transform.plugin";
import { ICategory } from "@/types/backend-index";
import mongoose from "mongoose";

export interface ICategoryModel extends mongoose.Document, ICategory {}

const categorySchema = new mongoose.Schema<ICategoryModel>(
  {
    label: { type: String, required: true },
    value: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true },
);

categorySchema.plugin(mongooseTransform);

export const CategoryModel =
  mongoose.models?.Category || mongoose.model("Category", categorySchema);
