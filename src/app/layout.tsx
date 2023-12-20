import type { Metadata } from 'next'
import { Plus_Jakarta_Sans as JakartaSans } from 'next/font/google'
import { ReactNode } from 'react'
import './globals.css'
import Providers from './providers'

const jakartaSans = JakartaSans({
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
  return (
    <html
      className={`bg-slate-50 ${jakartaSans.variable}`}
      lang="pt"
      suppressHydrationWarning
    >
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
