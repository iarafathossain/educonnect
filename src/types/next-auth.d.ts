import { DefaultSession } from "next-auth";

type UserRole = "student" | "instructor";

declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
      role: UserRole;
      firstName: string;
      lastName: string;
      profilePictureUrl?: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    role?: UserRole;
    firstName?: string;
    lastName?: string;
    profilePictureUrl?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: UserRole;
    firstName?: string;
    lastName?: string;
    picture?: string | null;
    profilePictureUrl?: string | null;
  }
}
