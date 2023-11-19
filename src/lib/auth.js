import bcrypt from 'bcryptjs';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '../models/User';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          // can be moved to separate endpoint
          const user = await User.findOne({ email: credentials.email });
          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );

            if (isPasswordCorrect) {
              return user;
            }
          }
        } catch (error) {
          throw new Error(error);
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      const user = token.user;
      session.user = user;

      return session;
    },
  },
};
