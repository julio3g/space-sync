import type { Metadata } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import { ReactNode } from 'react'
import './globals.css'
import Providers from './providers'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

const inter = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    template: '%s - Space Sync',
    absolute: 'Space Sync',
  },
  description: 'Bot to send messages on WhatsApp',
}

export default async function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  const session = await getServerSession()

  const unauthenticated = !session?.user

  // if (unauthenticated) {
  //   return redirect('/auth/sign-in')
  // }

  return (
    <html className={inter.variable} lang="pt" suppressHydrationWarning>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
