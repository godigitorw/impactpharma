import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

// In a production environment, this should be stored in a database
const ADMIN_CREDENTIALS = {
  email: "impactpharma19@gmail.com",
  // Password: "impactpharma19@!"
  password: "impactpharma19@!",
  name: "Admin User",
};

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Check if email matches
        if (credentials.email !== ADMIN_CREDENTIALS.email) {
          return null;
        }

        // Check if password matches
        const isValidPassword = credentials.password === ADMIN_CREDENTIALS.password;

        if (!isValidPassword) {
          return null;
        }

        return {
          id: "1",
          email: ADMIN_CREDENTIALS.email,
          name: ADMIN_CREDENTIALS.name,
        };
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "your-secret-key-change-this-in-production",
});

export { handler as GET, handler as POST };
