'use client'

import { Loader2 } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'

export function ButtonSignOut() {
  const [loading, setLoading] = useState(false)
  async function handleSignOut() {
    setLoading(true)

    await signOut({ callbackUrl: '/auth/sign-in' })
  }
  return (
    <Button
      className="absolute left-6 top-6"
      variant="ghost"
      onClick={handleSignOut}
      disabled={loading}
    >
      {loading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <span>Sair</span>
      )}
    </Button>
  )
}
