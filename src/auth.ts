import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { UserModel } from "./models/user-model";

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  ...authConfig,
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          const user = await UserModel.findOne({ email: credentials.email });
          if (!user) {
            return null;
          }

          const isPasswordValid = await bcrypt.compare(
            credentials?.password as string,
            user.password
          );
          if (!isPasswordValid) {
            return null;
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.firstName + " " + user.lastName,
            role: user.role,
          };
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
});
