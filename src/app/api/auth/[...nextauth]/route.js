import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user }) {
      // Call your Django API to check or create the user
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/social-login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email }),
      });

      if (res.ok) {
        return true; // allow login
      } else {
        return false; // block login if something goes wrong
      }
    },
    async session({ session, token }) {
      // Optionally add extra info to session
      session.user.id = token.id;
      return session;
    },
  },
});

export { handler as GET, handler as POST };