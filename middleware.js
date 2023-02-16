//This is the middleware to restrict pages, for pages that require auth you add them to the array by name.
//The Pages option will allow you to redirect to different pages based on the type of page specified. Must match whats in NextAuth.js

export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard", "/profile"],
  pages: {
    signIn: "/login",
  },
};
