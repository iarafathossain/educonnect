import { mongooseTransform } from "@/lib/mongoose-transform.plugin";
import mongoose from "mongoose";

export interface ICategoryModel extends mongoose.Document {
  title: string;
  icon: string;
}

const categorySchema = new mongoose.Schema<ICategoryModel>(
  {
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

categorySchema.plugin(mongooseTransform);

export const CategoryModel =
  mongoose.models?.Category || mongoose.model("Category", categorySchema);
