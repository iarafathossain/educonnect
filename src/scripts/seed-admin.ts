import { env } from "@/env";
import bcrypt from "bcryptjs";
import "dotenv/config";
import mongoose from "mongoose";
import { USER_ROLES } from "../constants/enums";
import { connectDB } from "../lib/connect-mongo";
import { UserModel } from "../models/user-model";

async function seedAdmin() {
  if (!env.MONGO_URI) {
    throw new Error("MONGO_URI is required to seed admin user");
  }

  await connectDB();

  const passwordHash = await bcrypt.hash(env.SEED_ADMIN_PASSWORD, 10);

  const existingUser = await UserModel.findOne({ email: env.SEED_ADMIN_EMAIL });

  if (existingUser) {
    existingUser.firstName = env.SEED_ADMIN_FIRST_NAME;
    existingUser.lastName = env.SEED_ADMIN_LAST_NAME;
    existingUser.role = USER_ROLES.admin;
    existingUser.passwordHash = passwordHash;
    await existingUser.save();
    return;
  }

  await UserModel.create({
    firstName: env.SEED_ADMIN_FIRST_NAME,
    lastName: env.SEED_ADMIN_LAST_NAME,
    email: env.SEED_ADMIN_EMAIL,
    role: USER_ROLES.admin,
    passwordHash,
  });
}

seedAdmin()
  .then(async () => {
    await mongoose.disconnect();
    process.exit(0);
  })
  .catch(async (error: unknown) => {
    console.error("Failed to seed admin user", error);
    await mongoose.disconnect();
    process.exit(1);
  });
