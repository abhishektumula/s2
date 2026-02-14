import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { client } from "@/app/db/index";
export type usersType = {
  username: string;
  password: string;
  securekey: string;
};

export const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "secure crendentials",
      credentials: {
        username: {
          label: "username",
          type: "text",
          placeholder: "@abhishek",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "@password",
        },
        securekey: {
          label: "securekey",
          type: "password",
          placeholder: "@securekey",
        },
      },

      async authorize(credentials) {
        const username = credentials?.username;
        const password = credentials?.password;
        const securekey = credentials?.securekey;

        if (!username || !password || !securekey) {
          return null;
        }

        const user = await client.users.findUnique({
          where: { username }, // assuming username is unique
        });

        if (!user) return null;

        // If passwords are hashed (recommended)
        const isPasswordValid = user.password === password;
        const isSecureKeyValid = user.securekey === securekey;

        if (!isPasswordValid || !isSecureKeyValid) {
          return null;
        }

        return {
          id: String(user.id),
          name: user.username,
          username: user.username,
        };
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
});

export { handler as GET, handler as POST };
