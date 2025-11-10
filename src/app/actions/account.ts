"use server";
import "@/models/user-model";

import { catchError } from "@/lib/catch-error";
import { UserModel } from "@/models/user-model";
import { validatePassword } from "@/queries/users";
import { PersonalDetailsFormData } from "@/types/frontend-index";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export const updatePersonalDetailsAction = async (
  email: string,
  userDataToUpdate: PersonalDetailsFormData
) => {
  const filter = { email: email };
  const dataToUpdate: PersonalDetailsFormData = { ...userDataToUpdate };

  try {
    await UserModel.findOneAndUpdate(filter, dataToUpdate);
    revalidatePath("/account");
  } catch (error) {
    const errorMsg = catchError(error);
    throw new Error(errorMsg);
  }
};

export const updateContactInfoAction = async (
  email: string,
  contactDataToUpdate: {
    website?: string;
    facebook?: string;
    twitter?: string;
    linkedin?: string;
  }
) => {
  const { website, facebook, twitter, linkedin } = contactDataToUpdate;
  const filter = { email: email };
  const dataToUpdate: {
    website?: string;
    socialLinks?: {
      facebook?: string;
      twitter?: string;
      linkedin?: string;
    };
  } = {
    website,
    socialLinks: {
      facebook,
      twitter,
      linkedin,
    },
  };

  try {
    await UserModel.findOneAndUpdate(filter, dataToUpdate);
    revalidatePath("/account");
  } catch (error) {
    const errorMsg = catchError(error);
    throw new Error(errorMsg);
  }
};

export const changePasswordAction = async (
  email: string,
  oldPassword: string,
  newPassword: string
) => {
  const isMatch = await validatePassword(email, oldPassword);

  if (!isMatch) {
    throw new Error("Please enter a valid current password");
  }

  const filter = { email: email };

  const hashedPassword = await bcrypt.hash(newPassword, 5);

  const dataToUpdate = {
    password: hashedPassword,
  };

  try {
    await UserModel.findOneAndUpdate(filter, dataToUpdate);
    revalidatePath("/account");
  } catch (error) {
    const errorMsg = catchError(error);
    throw new Error(errorMsg);
  }
};
