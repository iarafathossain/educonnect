import { mongooseTransform } from "@/lib/mongoose-transform.plugin";
import mongoose from "mongoose";

export interface ILive extends mongoose.Document {
  title: string;
  description: string;
  date: Date;
  time: string;
  thumbnail?: string;
  url?: string;
  instructor?: mongoose.Types.ObjectId;
  active: boolean;
}

const liveSchema = new mongoose.Schema<ILive>(
  {
    title: {
      required: true,
      type: String,
    },
    description: {
      required: true,
      type: String,
    },
    date: {
      required: true,
      type: Date,
    },
    time: {
      required: true,
      type: String,
    },
    thumbnail: {
      type: String,
    },
    url: {
      type: String,
    },
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    active: {
      required: true,
      default: false,
      type: Boolean,
    },
  },
  {
    timestamps: true,
  },
);

liveSchema.plugin(mongooseTransform);

export const LiveModel =
  mongoose.models?.Live || mongoose.model("Live", liveSchema);
