import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const walks = await prisma.walk.findMany({
      orderBy: { createdAt: 'desc' },
    });

    // Convert to CSV format
    const headers = ['Date', 'Distance (km)', 'Notes', 'Refused'];
    const rows = walks.map((walk) => [
      new Date(walk.createdAt).toLocaleDateString(),
      walk.distance,
      walk.notes || '',
      walk.refused ? 'Yes' : 'No',
    ]);

    const csv =
      [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(',')).join('\n') +
      '\n';

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="walks.csv"',
      },
    });
  } catch (error) {
    console.error('Failed to export walks:', error);
    return NextResponse.json({ error: 'Failed to export walks' }, { status: 500 });
  }
}
