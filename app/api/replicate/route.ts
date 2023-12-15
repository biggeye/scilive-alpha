import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
    const cookieStore = cookies();
  const supabase = createClient(cookieStore)
  const session = await supabase.auth.getSession()

  if (!session) {
    return new Response(JSON.stringify({
      error: 'not_authenticated',
      description: 'The user does not have an active session or is not authenticated',
    }), { status: 401 })
  }

  try {
    // Retrieve request body
    const bodyData = await req.json()
    const { version, image, input_image, prompt, negative_prompt } = bodyData

    const payload = {
      version,
      input: {
        ...(image && { image }),
        ...(input_image && { input_image }),
        ...(prompt && { prompt }),
        ...(negative_prompt && { negative_prompt }),
      },
    };

    if (Object.keys(payload.input).length === 0) {
      return new Response(JSON.stringify({ error: 'Missing input parameters' }), { status: 400 });
    }

    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${process.env.NEXT_PUBLIC_REPLICATE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.status !== 201) {
      const error = await response.json();
      return new Response(JSON.stringify({ detail: error.detail }), { status: 500 });
    }

    const prediction = await response.json();
    return new Response(JSON.stringify(prediction), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}

