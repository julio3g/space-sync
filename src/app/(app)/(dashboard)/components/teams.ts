import { prisma } from '@/lib/prisma'

export async function getTeams(userId: string) {
  const team = await prisma.team.findMany({
    where: {
      users: {
        every: { id: userId },
      },
    },
  })
  console.log(team)
}
