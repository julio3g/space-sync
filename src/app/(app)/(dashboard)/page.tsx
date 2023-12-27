'use client'

import { useSession } from 'next-auth/react'

import { getTeams } from './components/teams'

export default function Home() {
  // const { data } = useSession()
  // // const test = getTeams(data?.user?.id)
  // // console.log(test)
  // console.log(data?.user?.teams)
  const { data } = useSession()

  // console.log(data?.user?.teams[0].teamNameUrl)
  return (
    <div>
      <h1>test</h1>
    </div>
  )
}
