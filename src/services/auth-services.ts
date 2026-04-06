import { AppError } from "@/lib/app-error";
import { UserModel } from "@/models/user-model";
import { TUserRegistration } from "@/validators/user-schema";
import bcrypt from "bcryptjs";
import status from "http-status";

export const authServices = {
  register: async (payload: TUserRegistration) => {
    // destructure
    const { firstName, lastName, email, password, role } = payload;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new AppError("This user already exists", status.CONFLICT);
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      firstName,
      lastName,
      email,
      passwordHash,
      role,
    });

    const safeUser = newUser.toJSON();
    delete safeUser.passwordHash;

    return safeUser;
  },
};
