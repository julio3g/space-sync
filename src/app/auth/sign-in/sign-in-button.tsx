'use client'

import { Button } from '@/components/ui/button'
import { AtSign, Loader2 } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useState } from 'react'

export function SignInButton() {
  const [loading, setLoading] = useState(false)

  async function handleSignIn() {
    setLoading(true)

    await signIn('google', {
      callbackUrl: '/',
    })
  }

  return (
    <Button
      variant="outline"
      type="button"
      className="w-full"
      onClick={handleSignIn}
      disabled={loading}
    >
      {loading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <AtSign className="mr-2 h-4 w-4" />
      )}
      Faça login com o Google
    </Button>
  )
}
