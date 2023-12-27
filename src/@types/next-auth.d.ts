import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      teams?: {
        id: string
        name: string
        teamNameUrl: string
        color: string
      }[]
    } & DefaultSession['user']
  }
}
