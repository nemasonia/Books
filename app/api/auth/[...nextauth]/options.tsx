import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter"

export const options: NextAuthOptions = {
  debug: true,
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "アカウント",
      credentials: {
        name: { label: "Name", type: "name" },
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },

      // メルアド認証処理
      async authorize(credentials) {
        const users = [
          { id: "1", name: "a", email: "user1@example.com", password: "password1" },
          { id: "2", name: "b", email: "user2@example.com", password: "password2" },
          { id: "3", name: "c", email: "abc@abc", password: "123" },
        ];

        const user = users.find(user => user.name === credentials?.name);

        if (user && user?.password === credentials?.password) {
          return { id: user.id, name: user.name, email: user.email };
        } else {
          return null;
        }
      }
    }
    ),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,

  callbacks: {
    jwt: async ({ token, user, account, profile }) => {
      // 注意: トークンをログ出力してはダメです。
      console.log('in jwt', { user, token, account, profile })

      if (user) {
        token.user = user;
        const u = user as any
        token.role = u.role;
      }
      if (account) {
        token.accessToken = account.access_token
      }
      return token;
    },
    session: ({ session, token }) => {
      console.log("in session", { session, token });
      token.accessToken
      return {
        ...session,
        user: {
          ...session.user,
          password: token.password,
        },
      };
    },
  }
};