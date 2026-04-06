import { MongoDBAdapter } from "@auth/mongodb-adapter";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
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
  adapter: MongoDBAdapter(client),
  callbacks: {
    async jwt({ token, user }) {
      if (user?.email) {
        const dbUser = await UserModel.findOne({ email: user.email });
        console.log("DB User in JWT callback:", dbUser);

        if (dbUser) {
          token.id = dbUser._id.toString();
          token.role = dbUser.role;
          token.firstName = dbUser.firstName;
          token.lastName = dbUser.lastName;
          token.picture = dbUser.profilePictureUrl ?? token.picture;
          token.profilePictureUrl =
            dbUser.profilePictureUrl ?? token.profilePictureUrl;
        } else {
          token.id = user.id;
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
          (token.role as "student" | "instructor") ?? "student";
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
        session.user.image = token.picture ?? session.user.image;
        session.user.profilePictureUrl =
          (token.profilePictureUrl as string) ?? session.user.profilePictureUrl;
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
          if (!user) {
            return null;
          }

          const isPasswordValid = await bcrypt.compare(
            credentials?.password as string,
            user.password,
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
              profilePictureUrl: user.image || undefined,
              // default role for OAuth signups
              role: "student",
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
