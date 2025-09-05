import { NextRequest, NextResponse } from 'next/server';
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || 'RightRoute - Know Your Rights';
    const content = searchParams.get('content') || 'Your pocket guide to legal rights and interactions';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#1e1b4b',
            backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            fontSize: 32,
            fontWeight: 600,
            color: 'white',
            padding: '40px',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '30px',
            }}
          >
            <div
              style={{
                width: '60px',
                height: '60px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '20px',
                fontSize: '30px',
              }}
            >
              🛡️
            </div>
            <div style={{ fontSize: '48px', fontWeight: 'bold' }}>
              RightRoute
            </div>
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: '36px',
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: '20px',
              maxWidth: '800px',
              lineHeight: '1.2',
            }}
          >
            {title}
          </div>

          {/* Content */}
          <div
            style={{
              fontSize: '24px',
              textAlign: 'center',
              opacity: 0.9,
              maxWidth: '700px',
              lineHeight: '1.4',
              marginBottom: '30px',
            }}
          >
            {content}
          </div>

          {/* Footer */}
          <div
            style={{
              fontSize: '18px',
              opacity: 0.8,
              textAlign: 'center',
            }}
          >
            Your Pocket Guide to Knowing Your Rights
          </div>

          {/* Decorative elements */}
          <div
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              width: '100px',
              height: '100px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '50%',
              opacity: 0.5,
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '20px',
              width: '80px',
              height: '80px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '50%',
              opacity: 0.3,
            }}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error('Image generation error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to generate image',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
