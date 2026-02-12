import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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
        if (
          username === "user1" &&
          password === "password1" &&
          securekey === "123"
        ) {
          return {
            id: username,
            username: username,
            name: username,
          };
        } else if (
          username === "user2" &&
          password === "password2" &&
          securekey === "123123"
        ) {
          return {
            id: username,
            username: username,
            name: username,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
});

export { handler as GET, handler as POST };
