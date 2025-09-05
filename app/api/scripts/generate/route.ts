import { NextRequest, NextResponse } from 'next/server';
import { generateScript } from '@/lib/openai';
import { ScriptRequest, GeneratedScript } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body: ScriptRequest = await request.json();
    
    // Validate required fields
    if (!body.scenario || !body.state || !body.language) {
      return NextResponse.json(
        { error: 'Missing required fields: scenario, state, language' },
        { status: 400 }
      );
    }

    // Generate script using OpenAI
    const script: GeneratedScript = await generateScript(body);

    return NextResponse.json({
      success: true,
      data: script,
      metadata: {
        scenario: body.scenario,
        state: body.state,
        language: body.language,
        generatedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Script generation error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to generate script',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Script generation endpoint. Use POST with scenario, state, and language.',
    supportedLanguages: ['en', 'es'],
    supportedScenarios: [
      'Traffic Stop',
      'Street Encounter', 
      'Home Visit',
      'Workplace Interaction',
      'Public Space Encounter',
      'Airport/Border Crossing'
    ]
  });
}
