// Import necessary utilities and functions
import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/route';
import fetch from 'node-fetch'; // Ensure you're using a fetch polyfill compatible with your environment
import FormData from 'form-data'; // 'form-data' library for server-side form handling

export async function POST(req: any) {
  const supabase = createClient(req);
  const session = await supabase.auth.getSession();

  if (!session) {
    return new NextResponse(JSON.stringify({
      error: 'not_authenticated',
      description: 'The user does not have an active session or is not authenticated',
    }), { status: 401 });
  }

  const name = req.body.name; // The string variable
  const file = req.body.file; // The file variable

  try {
    const dIdFormData = new FormData();
    dIdFormData.append('name', name);
    dIdFormData.append('file', file.stream(), file.filename);

    const dIdResponse = await fetch(`https://api.d-id.com/tts/voices`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_DID_BEARER_TOKEN}`,
      },
      body: dIdFormData,
    });

    if (!dIdResponse.ok) {
      const error = await dIdResponse.json();
      return new NextResponse(JSON.stringify(error), { status: dIdResponse.status });
    }

    const dIdData = await dIdResponse.json();
    return new NextResponse(JSON.stringify(dIdData), { status: 200 });
  } catch (error) {
    console.error('Error making API call to D-ID:', error);
    return new NextResponse(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
