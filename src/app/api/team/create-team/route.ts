import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  const userSession = await getServerSession(authOptions)

  if (!userSession)
    return NextResponse.json({ message: 'Not authorized!' }, { status: 401 })

  try {
    const { name, teamNameUrl, color } = await request.json()
    const { id } = userSession.user
    const createTeam = await prisma.team.create({
      data: {
        name,
        teamNameUrl,
        color,
        users: { connect: [{ id }] },
      },
    })

    return NextResponse.json({ createTeam })
  } catch (err) {
    console.log(err)
  }
}
