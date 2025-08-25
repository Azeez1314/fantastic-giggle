import { NextResponse } from 'next/server'
import { db } from '@/db'
import { journals } from '@/db/schema'

export async function GET() {
  try {
    const allJournals = await db.query.journals.findMany()
    return NextResponse.json(allJournals)
  } catch (error) {
    console.error('Error fetching journals:', error)
    return NextResponse.json(
      { error: 'Failed to fetch journals' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Validate required fields
    if (!data.sleepHours || !data.userId) {
      return NextResponse.json(
        { error: 'Sleep hours and userId are required' },
        { status: 400 }
      )
    }

    // Create the issue
    const newJournal = await db
      .insert(journals)
      .values({
        sleepHours: data.sleepHours,
        note: data.note || null,
        goal: data.goal || null,
        status: data.status || 'backlog',
        mood: data.mood || 'calm',
        userId: data.userId,
      })
      .returning()

    return NextResponse.json(
      { message: 'Journal created successfully', journal: newJournal[0] },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating journal:', error)
    return NextResponse.json(
      { error: 'Failed to create journal' },
      { status: 500 }
    )
  }
}
