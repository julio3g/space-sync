import { Team } from '@prisma/client'

import { prisma } from '@/lib/prisma'

export async function fetchTeamsForUser(userId: string): Promise<Team[] | []> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { teams: true },
  })

  return user?.teams ?? []
}
