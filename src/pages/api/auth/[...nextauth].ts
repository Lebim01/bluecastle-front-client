/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authMe, login, ProfileWithToken } from "@/services/user";
import axiosInstance from "@/services";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (credentials?.username && credentials.password) {
          const token = await login(credentials.username, credentials.password);
          axiosInstance.defaults.headers.Authorization = "Bearer " + token;
          const user = await authMe(token);
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async signIn() {
      try {
        return true;
      } catch (err: any) {
        return false;
      }
    },
    async session({ session, token }) {
      /*const isExpired = dayjs(new Date(token.iat * 1000)).isBefore(new Date());

      if (isExpired) {
        throw new Error("Expired");
      }*/

      if (token?.accessToken) {
        const authme = await authMe(token?.accessToken);
        session.user = authme as ProfileWithToken;
        session.accessToken = token.accessToken;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
      }
      return token;
    },
  },
};

export default NextAuth(authOptions);
