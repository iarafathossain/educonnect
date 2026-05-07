"use server";

import { actionWrapper } from "@/lib/action-wrapper";
import { connectDB } from "@/lib/connect-mongo";
import { UserModel } from "@/models/user-model";
import status from "http-status";

export const updateUserRole = actionWrapper(async (userId: string, role: string) => {
  await connectDB();
  const updated = await UserModel.findByIdAndUpdate(userId, { role }, { new: true });
  if (!updated) {
    return { success: false, error: "User not found", statusCode: status.NOT_FOUND };
  }
  return { success: true, message: "User role updated", statusCode: status.OK };
});

export const deleteUser = actionWrapper(async (userId: string) => {
  await connectDB();
  const deleted = await UserModel.findByIdAndDelete(userId);
  if (!deleted) {
    return { success: false, error: "User not found", statusCode: status.NOT_FOUND };
  }
  return { success: true, message: "User deleted", statusCode: status.OK };
});
