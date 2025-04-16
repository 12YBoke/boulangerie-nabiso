import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import { verifyPassword } from "./lib/password-to-salt";
import prisma from "@/lib/prisma";

// Extend the Session type to include extensionId
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      extensionId: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      credentials: {
        name: {},
        extensionId: {},
        password: {},
      },

      async authorize(credentials) {
        if (credentials) {
          const user = await prisma.user.findUnique({
            where: {
              loginData: {
                name: credentials.name as string,
                extensionId: credentials.extensionId as string,
              },
            },
          });

          if (user) {
            if (
              verifyPassword(
                credentials.password as string,
                user.password!,
                user.salt!
              )
            ) {
              return user;
            }
            return null;
          }
          return null;
        }
        return null;
      },
    }),
  ],

  pages: {
    signIn: "/sign-in",
    signOut: "/sign-out",
    error: "/error",
    verifyRequest: "/verify-request",
    newUser: "/new-user",
  },

  callbacks: {
    jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        token.id = user.id;
        // Access extensionId from loginData or cast user to any as a temporary solution
        token.extensionId = (user as any).extensionId;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      session.user.extensionId = token.extensionId as string;
      return session;
    },
  },
});
