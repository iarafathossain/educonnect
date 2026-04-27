import { connectDB } from "@/lib/connect-mongo";
import { UserModel } from "@/models/user-model";
import { IUserFrontend, userFrontendSchema } from "@/validators/user-validator";
import bcrypt from "bcryptjs";

export const userServices = {
  getUserByEmail: async (email: string): Promise<IUserFrontend | null> => {
    await connectDB();

    const user = await UserModel.findOne({ email }).select("-passwordHash");
    if (!user) {
      return null;
    }

    return userFrontendSchema.parse(user.toJSON());
  },

  getUserDetails: async (userId: string): Promise<IUserFrontend | null> => {
    await connectDB();
    const user = await UserModel.findById(userId).select("-passwordHash");

    if (!user) {
      return null;
    }

    return userFrontendSchema.parse(user.toJSON());
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
