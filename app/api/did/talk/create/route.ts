// Assuming this file is located at app/api/did/talk/create/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  if (req.method === 'POST') {
    // Parse the JSON body
    const { avatarUrl, voiceId, avatarScript } = await req.json();
    
    try {
      const apiResponse = await fetch('https://api.external-service.com/talks', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Basic ${process.env.NEXT_PUBLIC_DID_API_KEY}`,
        },
        body: JSON.stringify({
          script: {
            type: 'text',
            subtitles: 'false',
            provider: {
              type: 'elevenlabs',
              voice_id: voiceId,
              voice_config: { stability: 'stability', similarity_boost: 'similarity' },
            },
            ssml: 'false',
            input: avatarScript,
            source_url: avatarUrl,
          },
          config: { fluent: 'false', pad_audio: '0.0' },
        }),
      });

      const data = await apiResponse.json();
      return new NextResponse(JSON.stringify(data), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
      console.error('API call failed:', error);
      return new NextResponse(JSON.stringify({ error: 'Failed to create talk' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
  } else {
    return new NextResponse('Method Not Allowed', { status: 405 });
  }
}
