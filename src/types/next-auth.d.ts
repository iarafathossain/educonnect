import { TUserRole } from "@/constants/enums";
import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    // Note: 'image' is already included inside DefaultSession["user"]
    user: {
      id: string;
      role: TUserRole;
      firstName: string;
      lastName: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    // Note: 'image' is already included inside DefaultUser
    role?: TUserRole;
    firstName?: string;
    lastName?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    // Note: 'picture' is natively used by NextAuth in the JWT token to store the image URL
    id: string;
    role?: TUserRole;
    firstName?: string;
    lastName?: string;
  }
}
