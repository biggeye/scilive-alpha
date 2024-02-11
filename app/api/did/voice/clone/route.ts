// Import necessary utilities and functions
import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/route';
import fetch from 'node-fetch'; // Ensure you're using a fetch polyfill compatible with your environment
import FormData from 'form-data'; // 'form-data' library for server-side form handling

export async function POST(req: any) {

  const { name, file } = req.body; // Destructuring assignment for readability

  try {
    const dIdFormData = new FormData();
    dIdFormData.append('name', name);
    dIdFormData.append('file', file); // Assuming 'file' is correctly handled before this point

    const dIdResponse = await fetch(`https://api.d-id.com/tts/voices`, {
      method: 'POST',
      headers: {
        // Removed Content-Type header, assuming authorization header key is corrected in the environment
        Authorization: `Bearer ${process.env.DID_BEARER_TOKEN}`, // Changed to server-side environment variable
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
