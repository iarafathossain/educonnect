import { catchError } from "@/lib/catch-error";
import { UserModel } from "@/models/user-model";
import { IUser } from "@/types/backend-index";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  try {
    const { firstName, lastName, email, password, userRole } =
      await request.json();

    if (!firstName || !lastName || !email || !password || !userRole) {
      return new NextResponse(
        JSON.stringify({ error: "All fields are required" }),
        { status: 400 }
      );
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return new NextResponse(
        JSON.stringify({ error: "User already exists" }),
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser: IUser = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: userRole,
    };

    await UserModel.create(newUser);

    return new NextResponse(
      JSON.stringify({ message: "User registered successfully" }),
      { status: 201 }
    );
  } catch (e) {
    const error = catchError(e);
    return new NextResponse(JSON.stringify({ error }), { status: 500 });
  }
};
