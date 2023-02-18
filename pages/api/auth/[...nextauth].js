import { Session } from "inspector";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "../../../lib/prisma";

const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    }),

    // ...add more providers here
  ],
  callbacks: {
    async signIn(user, account, profile) {
      // check if the user already exists in the database
      const existingUser = await prisma.user.findUnique({
        where: { email: user.user.email },
      });
      // if the user doesn't exist, create a new profile for them
      if (!existingUser) {
        await prisma.user.create({
          data: {
            name: user.user.name,
            email: user.user.email,
            image: user.user.image,
          },
        });
      } else {
        await prisma.user.update({
          where: {
            email: user.user.email,
          },
          data: {
            image: user.user.image,
          },
        });
      }
      prisma.$disconnect();
      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};
export default NextAuth(authOptions);
