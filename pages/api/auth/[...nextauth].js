import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],

  // A database is optional, but required to persist accounts in a database
  //   database: process.env.DATABASE_URL,
  callbacks: {
    async signIn(user, account, profile) {
      return "/dashbaord";
    },
    async jwt(token, user, account, profile, isNewUser) {
      if (user) {
        // User object only passed on initial JWT creation
        const administrators = ["jsmith@example.com"];
        token.isAdmin = administrators.includes(user?.email);
      }
      return token;
    },
  },
});
