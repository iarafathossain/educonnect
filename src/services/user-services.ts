import { connectDB } from "@/lib/connect-mongo";
import { UserModel } from "@/models/user-model";
import bcrypt from "bcryptjs";

export const userServices = {
  getUserByEmail: async (email: string) => {
    await connectDB();

    const user = await UserModel.findOne({ email });
    return user ? user.toJSON() : null;
  },

  getUserDetails: async (userId: string) => {
    await connectDB();
    const user = await UserModel.findById(userId).select("-passwordHash");
    console.log("user details", user);
    console.log("user details JSON", user?.toJSON());
    return user ? user.toJSON() : null;
  },

  validatePassword: async (email: string, oldPassword: string) => {
    await connectDB();
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    if (!user.passwordHash) {
      return true;
    }

    return bcrypt.compare(oldPassword, user.passwordHash);
  },
};

export const getUserByEmail = userServices.getUserByEmail;
export const getUserDetails = userServices.getUserDetails;
export const validatePassword = userServices.validatePassword;
