import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
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
