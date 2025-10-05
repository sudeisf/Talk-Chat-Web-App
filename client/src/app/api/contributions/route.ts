import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Generate mock contribution data for the user
    const contributions = generateMockContributions();

    return NextResponse.json(contributions);
  } catch (error) {
    console.error('Error fetching contributions:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function generateMockContributions() {
  const contributions = [];
  const startDate = new Date('2020-01-01');
  const endDate = new Date();
  
  // Generate random contribution data for each day
  for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
    const dateStr = `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
    
    // Generate random contribution count (0-10) with higher probability for lower numbers
    const random = Math.random();
    let count = 0;
    if (random > 0.7) count = Math.floor(Math.random() * 3) + 1; // 1-3 contributions
    else if (random > 0.9) count = Math.floor(Math.random() * 4) + 4; // 4-7 contributions
    else if (random > 0.98) count = Math.floor(Math.random() * 3) + 8; // 8-10 contributions
    
    contributions.push({
      date: dateStr,
      count: count
    });
  }
  
  return contributions;
}
