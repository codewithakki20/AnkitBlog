import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';

const adminEmails = ['ankitpatel657843@gmail.com', '']; // List of admin emails

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log('signIn callback:', { user, account, profile });
      // Compare the email from the user object
      if (adminEmails.includes(user.email)) {
        user.role = 'admin';
      } else {
        user.role = 'user';
      }
      return true; // Allow sign-in
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        role: token.role, // Pass the role to the session
      };
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role; // Store role in token
      }
      return token;
    },
  },
  pages: {
    signIn: '/login', // Custom login page
    error: '/error',  // Redirect to error page on failure
  },
});

export { handler as GET, handler as POST };
