// Assuming this is a file located in app/api/did/talk/create/route.ts for Next.js 14 App Router
import { NextRequest, NextResponse } from 'next/server';

interface CheckResponse {
  id: string;
  user_id: string;
  source_url: string;
  driver_url: string;
  created_at: string;
  created_by: string;
  audio_url: string;
  started_at: string;
  modified_at: string;
  status: string;
  result_url: string;
  metadata: Record<string, unknown>;
  webhook: string;
  config: {
    logo: {
      url: string;
      position: [number, number];
    };
    align_driver: boolean;
    align_expand_factor: number;
    auto_match: boolean;
    motion_factor: number;
    normalization_factor: number;
    sharpen: boolean;
    stitch: boolean;
    result_format: string;
    fluent: boolean;
    pad_audio: number;
    driver_expressions: {
      expressions: Array<{
        start_frame: number;
        expression: string;
        intensity: number;
      }>;
      transition_frames: number;
    };
  };
}

interface AvatarCreationRequest {
  avatarScript: string;
  uploadedFileUrl: string;
  voiceId: string;
}

export async function POST(req: NextRequest) {
  try {
    const requestBody = await req.json() as AvatarCreationRequest;
    if (!requestBody.avatarScript || !requestBody.uploadedFileUrl) {
      return new NextResponse(JSON.stringify({ error: 'Missing required fields: avatar_script or source_url' }), { status: 400 });
    }

    const { avatarScript, uploadedFileUrl, voiceId } = requestBody;

    // Initialize a variable to store the response from the D-ID API
    let avatarResponse: CheckResponse | null = null;

    const response = await fetch(`https://api.d-id.com/talks`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        // Use your actual bearer token here
        authorization: 'Bearer YOUR_ACTUAL_BEARER_TOKEN'
      },
      body: JSON.stringify({
        script: {
          type: 'text',
          subtitles: 'false',
          provider: {type: 'elevenlabs', voice_id: voiceId},
          ssml: 'false',
          input: avatarScript,
        },
        config: { fluent: 'false', pad_audio: '0.0' },
        source_url: uploadedFileUrl
      })
    });

    if (response.ok) {
      avatarResponse = await response.json() as CheckResponse;
      // Assuming polling or other operations are needed after this point
    } else {
      console.error('Failed to create avatar');
      return new NextResponse(JSON.stringify({ error: 'Failed to create avatar' }), { status: response.status });
    }

    // Perform polling or additional operations as needed

    // Final response to the client
    return new NextResponse(JSON.stringify(avatarResponse), { status: 200 });
  } catch (error) {
    console.error('API route error:', error);
    return new NextResponse(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
