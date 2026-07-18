import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const walks = await prisma.walk.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
    });
    return NextResponse.json(walks);
  } catch (error) {
    console.error('Failed to fetch walks:', error);
    return NextResponse.json({ error: 'Failed to fetch walks' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { distance, notes, refused } = body;

    const walk = await prisma.walk.create({
      data: {
        distance: refused ? 0 : distance,
        notes,
        refused,
      },
    });

    return NextResponse.json(walk, { status: 201 });
  } catch (error) {
    console.error('Failed to create walk:', error);
    return NextResponse.json({ error: 'Failed to create walk' }, { status: 500 });
  }
}
