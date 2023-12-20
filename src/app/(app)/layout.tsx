import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

export default async function PrivatePageLayout({
  children,
}: {
  children: ReactNode
}) {
  const session = await getServerSession(authOptions)

  const unauthenticated = !session?.user

  if (unauthenticated) {
    return redirect('/auth/sign-in')
  }

  return <>{children}</>
}
