import { catchError } from "@/lib/catch-error";
import { UserModel } from "@/models/user-model";
import { IUser } from "@/types/backend-index";
import { userRegistrationValidator } from "@/validations/user-registration-validator";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  try {
    const body = await request.json();

    const parsed = userRegistrationValidator.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.format() },
        { status: 400 }
      );
    }

    const { firstName, lastName, email, password, userRole } = parsed.data;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return new NextResponse(
        JSON.stringify({ error: "This user already exists" }),
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const roleValue: "student" | "instructor" =
      userRole === "instructor" ? "instructor" : "student";

    const newUser: IUser = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: roleValue,
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
