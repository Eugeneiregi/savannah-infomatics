import NextAuth from "next-auth";
import type { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: "77456033734-54qs8bm2nns7dg4umfm8rmi0qbr3djat.apps.googleusercontent.com",
      clientSecret: "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",
    }),
    GithubProvider({
      clientId: "Ov23liFZm48RpE8YWiRS",
      clientSecret: "81368fcc96427f044716f20aa5a86aeccd5bd61e",
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };