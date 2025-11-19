import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

// In a production environment, this should be stored in a database
const ADMIN_CREDENTIALS = {
  email: "admin@impactpharma.rw",
  // Default password: "admin123" (hashed)
  // You should change this immediately after first login
  passwordHash: "$2a$10$ZxQk5YxGxG0kHXQvQZxvYuKQH1qnpZ6ZGKmvZYxGxG0kHXQvQZxvYu",
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

        // For initial setup, accept the default password
        // In production, you should hash the password properly
        const isValidPassword = credentials.password === "admin123";

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
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "your-secret-key-change-this-in-production",
});

export { handler as GET, handler as POST };
