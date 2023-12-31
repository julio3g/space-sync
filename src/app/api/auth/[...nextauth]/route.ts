import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { Team } from '@prisma/client'
import NextAuth, { AuthOptions } from 'next-auth'
import { Adapter } from 'next-auth/adapters'
import GoogleProvider from 'next-auth/providers/google'

import { env } from '@/env'
import { prisma } from '@/lib/prisma'
import { fetchTeamsForUser } from '@/utils/fetchTeamsForUser'

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      session.user = { ...session.user, id: user.id } as {
        id: string
        name: string
        email: string
        teams?: Team[]
      }

      if (user) {
        const userTeams = await fetchTeamsForUser(user.id)
        session.user.teams = userTeams ?? []
      }

      return session
    },
  },
  pages: {
    signIn: '/auth/sign-in',
    error: '/auth/error',
    newUser: '/create-team',
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
