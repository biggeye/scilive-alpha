// Assuming this is a file located in app/api/did/talk/create/route.ts for Next.js 14 App Router
import { NextRequest, NextResponse } from 'next/server';
import { createAvatar } from '@/lib/d-id/talks/createTalk';

interface AvatarCreationRequest {
  avatar_script: string;
  source_url: string;
}

export async function POST(req: NextRequest) {
  try {
    // Validate request method is handled directly by the file structure in Next.js 14 App Router

    // Parse the request body. Note: NextRequest.json() is an async operation
    const requestBody = await req.json() as AvatarCreationRequest;

    // Validate request body content
    if (!requestBody.avatar_script || !requestBody.source_url) {
      return new NextResponse(JSON.stringify({ error: 'Missing required fields: avatar_script or source_url' }), { status: 400 });
    }

    // Destructure the requestBody for easier access
    const { avatar_script, source_url } = requestBody;

    // Proceed with avatar creation
    const avatarResponse = await createAvatar(avatar_script, source_url);

    // Assuming createAvatar returns data that can be directly sent back
    return new NextResponse(JSON.stringify(avatarResponse), { status: 200 });
  } catch (error) {
    console.error('API route error:', error);
    return new NextResponse(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
