import { TUserRole, USER_ROLES } from "@/constants/enums";
import { mongooseTransform } from "@/lib/mongoose-transform.plugin";
import { TUserRegistration } from "@/validators/user-validator";

import mongoose from "mongoose";

export interface IUser
  extends
    mongoose.Document,
    Omit<TUserRegistration, "password" | "confirmPassword"> {
  passwordHash?: string; // optional for OAuth users
  role: TUserRole;
  phone?: string;
  bio?: string;
  website?: string;
  image?: string;
  designation?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
}

const userSchema = new mongoose.Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String }, // optional for OAuth users
    role: { type: String, enum: USER_ROLES, required: true },
    phone: { type: String },
    bio: { type: String },
    website: { type: String },
    image: { type: String },
    designation: { type: String },
    socialLinks: {
      linkedin: { type: String },
      twitter: { type: String },
      facebook: { type: String },
      instagram: { type: String },
    },
  },
  { timestamps: true },
);

userSchema.plugin(mongooseTransform);

export const UserModel =
  mongoose.models?.User || mongoose.model("User", userSchema);
