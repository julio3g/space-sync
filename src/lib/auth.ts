import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { Team } from '@prisma/client'
import { AuthOptions, Session } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

import { env } from '@/env'
import { fetchTeamsForUser } from '@/utils/fetchTeamsForUser'

import { prisma } from './prisma'

interface ExtendedSession extends Session {
  user: {
    id: string
    name: string
    email: string
    teams?: Team[]
  }
}

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
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

      const extendedSession: ExtendedSession = session as ExtendedSession

      if (user) {
        const userTeams = await fetchTeamsForUser(user.id)
        extendedSession.user.teams = userTeams ?? []
      }

      return session
    },
  },
}
