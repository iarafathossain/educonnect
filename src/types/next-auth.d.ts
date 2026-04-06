import { DefaultSession } from "next-auth";
import "next-auth/jwt";
import { TSessionUser } from "./user";

declare module "next-auth" {
  interface Session {
    // Note: 'image' is already included inside DefaultSession["user"]
    user: TSessionUser & DefaultSession["user"];
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface User extends TSessionUser {}
}

declare module "next-auth/jwt" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface JWT extends TSessionUser {}
}
