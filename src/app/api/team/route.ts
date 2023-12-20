import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { authOptions } from '../auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  console.log('SererSession', session)
  if (!session) {
    return NextResponse.json({ message: 'Not authorized!' }, { status: 401 })
  }
  try {
    const { name, description } = await request.json()
    const createTeam = await prisma.team.create({
      data: {
        name,
        description,
      },
    })
    return NextResponse.json({ createTeam })
  } catch (err) {
    console.log(err)
  }
}
