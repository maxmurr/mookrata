import { PrismaAdapter } from '@next-auth/prisma-adapter'
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
  User,
} from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'

import { env } from '@/env'
import { db } from '@/server/db'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string
      name: string
    } & DefaultSession['user']
  }

  interface User {
    id: string
    name: string
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt',
  },
  secret: env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/dashboard/sign-in',
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith('/')) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      id: 'credentials',
      credentials: {
        name: { type: 'text' },
        password: { type: 'password' },
      },
      async authorize(credentials): Promise<User | null> {
        console.log(credentials)
        try {
          if (!credentials) {
            throw new Error('No credentials.')
          }

          const { name, password } = credentials

          if (!name || !password) {
            throw new Error('Invalid credentials.')
          }

          const user = await db.user.findUnique({
            where: {
              name,
            },
          })

          if (!user) {
            throw new Error('User not found.')
          }

          const isPasswordValid = await bcrypt.compare(password, user.password)

          if (!isPasswordValid) {
            throw new Error('Incorrect password.')
          }

          return {
            ...user,
            id: user.id.toString(),
          }
        } catch (e) {
          console.error(e)
          throw new Error('An error occurred.')
        }
      },
    }),
  ],
}

export const getServerAuthSession = () => getServerSession(authOptions)
