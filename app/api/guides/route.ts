import { NextRequest, NextResponse } from 'next/server';
import { SAMPLE_RIGHTS_CARDS } from '@/lib/constants';
import { Guide } from '@/lib/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const state = searchParams.get('state');
    const language = searchParams.get('language') || 'en';
    const contentType = searchParams.get('contentType');

    let guides = SAMPLE_RIGHTS_CARDS.map((card, index) => ({
      guideId: card.id,
      title: card.title,
      content: card.content,
      language: language as 'en' | 'es',
      state: card.state,
      contentType: 'rights-card' as const,
      keyPoints: card.keyPoints
    }));

    // Filter by state if provided
    if (state) {
      guides = guides.filter(guide => 
        guide.state.toLowerCase() === state.toLowerCase()
      );
    }

    // Filter by content type if provided
    if (contentType) {
      guides = guides.filter(guide => guide.contentType === contentType);
    }

    return NextResponse.json({
      success: true,
      data: guides,
      metadata: {
        total: guides.length,
        filters: {
          state: state || 'all',
          language,
          contentType: contentType || 'all'
        }
      }
    });

  } catch (error) {
    console.error('Guides fetch error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch guides',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields for creating a new guide
    if (!body.title || !body.content || !body.state) {
      return NextResponse.json(
        { error: 'Missing required fields: title, content, state' },
        { status: 400 }
      );
    }

    // In a real app, this would save to a database
    const newGuide: Guide = {
      guideId: `custom-${Date.now()}`,
      title: body.title,
      content: body.content,
      language: body.language || 'en',
      state: body.state,
      contentType: body.contentType || 'rights-card'
    };

    return NextResponse.json({
      success: true,
      data: newGuide,
      message: 'Guide created successfully'
    });

  } catch (error) {
    console.error('Guide creation error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to create guide',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
