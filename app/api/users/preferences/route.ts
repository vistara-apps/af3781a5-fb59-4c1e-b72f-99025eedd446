import { NextRequest, NextResponse } from 'next/server';
import { User, UserPreferences } from '@/lib/types';

// In-memory storage for demo purposes
// In production, this would use a proper database
let users: User[] = [];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'Missing userId parameter' },
        { status: 400 }
      );
    }

    const user = users.find(u => u.userId === userId);
    
    if (!user) {
      // Return default preferences for new users
      const defaultPreferences: UserPreferences = {
        language: 'en',
        state: 'California',
        notifications: true
      };

      return NextResponse.json({
        success: true,
        data: defaultPreferences,
        message: 'Default preferences returned for new user'
      });
    }

    return NextResponse.json({
      success: true,
      data: user.preferences
    });

  } catch (error) {
    console.error('Preferences fetch error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch user preferences',
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
    if (!body.userId) {
      return NextResponse.json(
        { error: 'Missing required field: userId' },
        { status: 400 }
      );
    }

    const existingUserIndex = users.findIndex(u => u.userId === body.userId);
    
    const preferences: UserPreferences = {
      language: body.language || 'en',
      state: body.state || 'California',
      notifications: body.notifications !== undefined ? body.notifications : true
    };

    if (existingUserIndex >= 0) {
      // Update existing user
      users[existingUserIndex].preferences = preferences;
      users[existingUserIndex].farcasterId = body.farcasterId || users[existingUserIndex].farcasterId;
      users[existingUserIndex].walletAddress = body.walletAddress || users[existingUserIndex].walletAddress;
      users[existingUserIndex].premiumContent = body.premiumContent || users[existingUserIndex].premiumContent;
    } else {
      // Create new user
      const newUser: User = {
        userId: body.userId,
        farcasterId: body.farcasterId,
        walletAddress: body.walletAddress,
        preferences,
        premiumContent: body.premiumContent || false
      };
      users.push(newUser);
    }

    return NextResponse.json({
      success: true,
      data: preferences,
      message: 'User preferences updated successfully'
    });

  } catch (error) {
    console.error('Preferences update error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to update user preferences',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  // Alias for POST to handle updates
  return POST(request);
}
