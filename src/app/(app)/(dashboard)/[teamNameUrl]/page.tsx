import { api } from '@/lib/axios'
import { ButtonSignOut } from './components/button-sign-out'

export default async function TeamNameUrl({
  params,
}: {
  params: { teamNameUrl: string }
}) {
  return (
    <div>
      Nome do time: {params.teamNameUrl} <ButtonSignOut />
    </div>
  )
}
