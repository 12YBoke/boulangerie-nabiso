import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Credentials from "next-auth/providers/credentials"
import { verifyPassword } from "./lib/password-to-salt"
import prisma from "@/lib/prisma"

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: 'jwt'
  },
  adapter: PrismaAdapter(prisma),
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
              }
            },
          });
          
          if (user) {
            if (verifyPassword(credentials.password as string, user.password!, user.salt!)) {
              return user
            }
            return null
          }
          return null
        }
        return null
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
  
})