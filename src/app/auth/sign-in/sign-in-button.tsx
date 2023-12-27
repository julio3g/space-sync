'use client'

import { AtSign, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'

export function SignInButton() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { data, status } = useSession()

  useEffect(() => {
    if (status === 'authenticated' && data.user.teams.length > 0) {
      const teamUrl = data.user.teams[0].teamNameUrl
      localStorage.setItem('teamURL', teamUrl)
      router.push(`/${teamUrl}`)
    }
  }, [data, status, router])

  async function handleSignIn() {
    setLoading(true)
    await signIn('google')
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
