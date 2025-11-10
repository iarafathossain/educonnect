import { IUser } from "@/types/backend-index";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema<IUser>(
  {
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  // password is optional for OAuth users
  password: { type: String },
    role: { type: String, enum: ["student", "instructor"], required: true },
    phone: { type: String },
    bio: { type: String },
    profilePictureUrl: { type: String },
    designation: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    socialLinks: {
      linkedin: { type: String },
      twitter: { type: String },
      facebook: { type: String },
      instagram: { type: String },
    },
  },
  { timestamps: true }
);

export const UserModel =
  (mongoose.models?.User as mongoose.Model<IUser>) ||
  mongoose.model<IUser>("User", userSchema);
