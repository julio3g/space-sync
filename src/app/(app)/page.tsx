'use client'

import { useSession } from 'next-auth/react'

export default function Home() {
  const data = useSession()
  console.log(data)
  return (
    <div>
      <h1>test</h1>
    </div>
  )
}
