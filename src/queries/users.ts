import { transformMongoDoc } from "@/lib/transform-mongo-doc";
import { UserModel } from "@/models/user-model";
import { connectDB } from "@/services/connect-mongo";

export const getUserByEmail = async (email: string) => {
  connectDB();

  const user = await UserModel.findOne({ email }).lean();
  return transformMongoDoc(user);
};
