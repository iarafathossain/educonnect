import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { authConfig } from "./auth.config";
import { UserModel } from "./models/user-model";

// const refreshAccessToken = async (token) => {
//   try {
//     const url =
//       "https://oauth2.googleapis.com/token?" +
//       new URLSearchParams({
//         client_id: process.env.GOOGLE_CLIENT_ID as string,
//         client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
//         grant_type: "refresh_token",
//         refresh_token: token.refreshToken,
//       });

//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//     });

//     const refreshedTokens = await response.json();

//     if (!response.ok) {
//       throw new Error("Failed to refresh access token");
//     }

//     return {
//       ...token,
//       accessToken: refreshedTokens.access_token,
//       accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
//       refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
//     };
//   } catch (error) {
//     console.error(error);
//     return {
//       ...token,
//       error: "RefreshAccessTokenError",
//     };
//   }
// };

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
  //   callbacks: {
  //     async jwt({ token, user, account }) {
  //       if (account && user) {
  //         return {
  //           accessToken: account?.access_token,
  //           refreshToken: account?.refresh_token,
  //           accessTokenExpires: account?.expires_in! * 1000 + Date.now(),
  //           user,
  //         };
  //       }

  //       if (Date.now() < (token?.accessTokenExpires as number)) {
  //         return token;
  //       }

  //       // Access token has expired, so we need to refresh it
  //       // session callback will be called after this jwt callback and will get the updated token what we return here
  //       return refreshAccessToken(token);
  //     },
  //     async session({ session, token }) {
  //       session.user = token?.user;
  //       session.accessToken = token?.accessToken;
  //       session.error = token?.error;

  //       return session;
  //     },
  //   },
});
