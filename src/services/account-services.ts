import { AppError } from "@/lib/app-error";
import { UserModel } from "@/models/user-model";
import {
  TChangePasswordPayload,
  TContactInfoUpdate,
  TPersonalDetailsUpdate,
} from "@/validators/account-validator";
import bcrypt from "bcryptjs";
import status from "http-status";

export const accountServices = {
  updatePersonalDetails: async (
    email: string,
    payload: TPersonalDetailsUpdate,
  ) => {
    const updatedUser = await UserModel.findOneAndUpdate({ email }, payload, {
      new: true,
    });

    if (!updatedUser) {
      throw new AppError("User not found", status.NOT_FOUND);
    }

    const safeUser = updatedUser.toJSON();
    delete safeUser.passwordHash;

    return safeUser;
  },

  updateContactInfo: async (email: string, payload: TContactInfoUpdate) => {
    const { phone, website, facebook, twitter, linkedin } = payload;

    const updatedUser = await UserModel.findOneAndUpdate(
      { email },
      {
        phone,
        website,
        socialLinks: {
          facebook,
          twitter,
          linkedin,
        },
      },
      { new: true },
    );

    if (!updatedUser) {
      throw new AppError("User not found", status.NOT_FOUND);
    }

    const safeUser = updatedUser.toJSON();
    delete safeUser.passwordHash;

    return safeUser;
  },

  changePassword: async (email: string, payload: TChangePasswordPayload) => {
    const { oldPassword, newPassword } = payload;

    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new AppError("User not found", status.NOT_FOUND);
    }

    if (!user.passwordHash) {
      throw new AppError(
        "Password cannot be changed for this account",
        status.BAD_REQUEST,
      );
    }

    const isMatch = await bcrypt.compare(oldPassword, user.passwordHash);

    if (!isMatch) {
      throw new AppError(
        "Please enter a valid current password",
        status.BAD_REQUEST,
      );
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);
    user.passwordHash = passwordHash;
    await user.save();

    return true;
  },
};
