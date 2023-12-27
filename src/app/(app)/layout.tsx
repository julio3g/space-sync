import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { ReactNode } from 'react'

import { authOptions } from '@/lib/auth'

export default async function PrivatePageLayout({
  children,
}: {
  children: ReactNode
}) {
  const session = await getServerSession(authOptions)

  const unauthenticated = !session?.user

  if (unauthenticated) return redirect('/auth/sign-in')

  return <>{children}</>
}
