import { connectDB } from "@/lib/connect-mongo";
import { UserModel } from "@/models/user-model";
import bcrypt from "bcryptjs";

export const getUserByEmail = async (email: string) => {
  await connectDB();

  const user = await UserModel.findOne({ email });
  return user ? user.toJSON() : null;
};

export async function getUserDetails(userId: string) {
  await connectDB();
  const user = await UserModel.findById(userId).select("-password");
  return user ? user.toJSON() : null;
}

export const validatePassword = async (email: string, oldPassword: string) => {
  connectDB();
  const user = await getUserByEmail(email);

  if (!user) {
    throw new Error("User not found");
  }

  if (!user.password) {
    return true;
  }
  const isMatch = await bcrypt.compare(oldPassword, user.password);
  return isMatch;
};
