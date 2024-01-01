// app/routes/api/replicate/[id].ts

import { NextRequest, NextResponse } from 'next/server';

export default async function handler(req: NextRequest) {
  // Extract the ID from the URL
  const id = req.nextUrl.pathname.split('/').pop();

  const response = await fetch(`https://api.replicate.com/v1/predictions/${id}`, {
    headers: {
      'Authorization': `Token ${process.env.NEXT_PUBLIC_REPLICATE_API_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json();
    return new Response(JSON.stringify({ detail: error.detail }), { status: response.status });
  }

  const prediction = await response.json();
  return new Response(JSON.stringify(prediction));
}
