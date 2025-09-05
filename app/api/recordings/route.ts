import { NextRequest, NextResponse } from 'next/server';
import { Recording } from '@/lib/types';

// In-memory storage for demo purposes
// In production, this would use a proper database
let recordings: Recording[] = [];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    let userRecordings = recordings;

    // Filter by user if provided
    if (userId) {
      userRecordings = recordings.filter(recording => recording.userId === userId);
    }

    return NextResponse.json({
      success: true,
      data: userRecordings,
      metadata: {
        total: userRecordings.length,
        userId: userId || 'all'
      }
    });

  } catch (error) {
    console.error('Recordings fetch error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch recordings',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.userId || !body.filePath) {
      return NextResponse.json(
        { error: 'Missing required fields: userId, filePath' },
        { status: 400 }
      );
    }

    const newRecording: Recording = {
      recordingId: `rec-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      userId: body.userId,
      timestamp: new Date(),
      filePath: body.filePath,
      storageType: body.storageType || 'local'
    };

    // Store recording (in production, this would be in a database)
    recordings.push(newRecording);

    return NextResponse.json({
      success: true,
      data: newRecording,
      message: 'Recording saved successfully'
    });

  } catch (error) {
    console.error('Recording save error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to save recording',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const recordingId = searchParams.get('recordingId');

    if (!recordingId) {
      return NextResponse.json(
        { error: 'Missing recordingId parameter' },
        { status: 400 }
      );
    }

    const recordingIndex = recordings.findIndex(r => r.recordingId === recordingId);
    
    if (recordingIndex === -1) {
      return NextResponse.json(
        { error: 'Recording not found' },
        { status: 404 }
      );
    }

    // Remove recording
    const deletedRecording = recordings.splice(recordingIndex, 1)[0];

    return NextResponse.json({
      success: true,
      data: deletedRecording,
      message: 'Recording deleted successfully'
    });

  } catch (error) {
    console.error('Recording delete error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to delete recording',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
