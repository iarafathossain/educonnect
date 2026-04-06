import { USER_ROLES } from "@/constants/enums";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import type { Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { authConfig } from "./auth.config";
import client from "./lib/mongo-client";
import { UserModel } from "./models/user-model";

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  ...authConfig,
  session: { strategy: "jwt" },
  adapter: MongoDBAdapter(client) as Adapter,
  callbacks: {
    async jwt({ token, user }) {
      // 'user' is only passed in on the initial sign-in
      if (user?.email) {
        const dbUser = await UserModel.findOne({ email: user.email });

        if (dbUser) {
          token.id = dbUser._id.toString();
          token.role = dbUser.role;
          token.firstName = dbUser.firstName;
          token.lastName = dbUser.lastName;
          token.picture = dbUser.image ?? token.picture;
        } else {
          // Fallback for new Google OAuth users before the 'createUser' event finishes
          token.id = user.id!;
          token.firstName = user.name?.split(" ")[0] ?? "";
          token.lastName = user.name?.split(" ").slice(1).join(" ") ?? "";
          token.picture = user.image ?? token.picture;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role =
          token.role === USER_ROLES.instructor
            ? USER_ROLES.instructor
            : USER_ROLES.student;
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
        session.user.image =
          (token.picture as string | undefined) ?? session.user.image;
      }
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          const user = await UserModel.findOne({ email: credentials.email });
          if (!user || !user.passwordHash) {
            // Ensure user and passwordHash exist
            return null;
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password as string,
            user.passwordHash, // Corrected from user.password
          );

          if (!isPasswordValid) {
            return null;
          }

          return {
            id: user._id.toString(),
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            image: user.image,
          };
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  events: {
    async createUser({ user }) {
      try {
        if (!user || !user.email) return;

        const name = user.name || "";
        const [firstName, ...rest] = name.split(" ");
        const lastName = rest.join(" ") || "";

        await UserModel.findOneAndUpdate(
          { email: user.email },
          {
            $set: {
              firstName: firstName || user.name || "",
              lastName: lastName,
              email: user.email,
              image: user.image || undefined,
              role: USER_ROLES.student, // default role for OAuth signups
            },
          },
          { upsert: true, new: true, setDefaultsOnInsert: true },
        );
      } catch (err) {
        console.error("Error syncing OAuth user to UserModel:", err);
      }
    },
  },
});
