import './globals.css'

import type { Metadata } from 'next'
import { Plus_Jakarta_Sans as PlusJakartaSans } from 'next/font/google'
import { ReactNode } from 'react'

import Providers from './providers'

const jakarta = PlusJakartaSans({
  subsets: ['latin'],
  variable: '--font-jakarta',
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
    <html className={jakarta.variable} lang="pt" suppressHydrationWarning>
      <body className="bg-slate-50 antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
