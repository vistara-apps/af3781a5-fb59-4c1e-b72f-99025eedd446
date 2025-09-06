import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.content) {
      return NextResponse.json(
        { error: 'Missing required fields: title, content' },
        { status: 400 }
      );
    }

    // Generate shareable card data
    const shareableCard = {
      id: `share-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: body.title,
      content: body.content,
      keyPoints: body.keyPoints || [],
      state: body.state || 'General',
      language: body.language || 'en',
      createdAt: new Date().toISOString(),
      shareUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://rightroute.app'}/share/${Date.now()}`,
      farcasterFrame: {
        version: 'vNext',
        image: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://rightroute.app'}/api/share/image?title=${encodeURIComponent(body.title)}`,
        buttons: [
          {
            label: 'View Full Guide',
            action: 'link',
            target: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://rightroute.app'}/share/${Date.now()}`
          },
          {
            label: 'Open RightRoute',
            action: 'link', 
            target: process.env.NEXT_PUBLIC_BASE_URL || 'https://rightroute.app'
          }
        ]
      }
    };

    return NextResponse.json({
      success: true,
      data: shareableCard,
      message: 'Shareable card created successfully'
    });

  } catch (error) {
    console.error('Share creation error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to create shareable card',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const shareId = searchParams.get('shareId');

    if (!shareId) {
      return NextResponse.json(
        { error: 'Missing shareId parameter' },
        { status: 400 }
      );
    }

    // In a real app, this would fetch from a database
    // For demo purposes, return a sample card
    const sharedCard = {
      id: shareId,
      title: 'Traffic Stop Rights',
      content: 'You have the right to remain silent. You must provide license, registration, and insurance if requested.',
      keyPoints: [
        'Keep hands visible',
        'Remain calm and polite', 
        'You can refuse searches without a warrant',
        'Ask "Am I free to go?"'
      ],
      state: 'California',
      language: 'en',
      createdAt: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      data: sharedCard
    });

  } catch (error) {
    console.error('Share fetch error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch shared card',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
