import { transformMongoDoc } from "@/lib/transform-mongo-doc";
import { UserModel } from "@/models/user-model";
import { connectDB } from "@/services/connect-mongo";
import bcrypt from "bcryptjs";

export const getUserByEmail = async (email: string) => {
  connectDB();

  const user = await UserModel.findOne({ email }).lean();
  return transformMongoDoc(user);
};

export async function getUserDetails(userId: string) {
  console.log({ userId });
  const user = await UserModel.findById(userId).select("-password").lean();
  console.log("user: ", user);
  return transformMongoDoc(user);
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
