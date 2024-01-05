// Assuming the file is located at /app/api/replicate/[id]/page.js
import { NextRequest, NextResponse } from 'next/server';

export default async function handler(req) {
  // Check if the HTTP method is GET
  if (req.method !== 'GET') {
    return new Response(null, { status: 405 });
  }

  // Extract the ID from the URL query parameters
  const { id } = req.query;

  // Your existing logic to fetch and return data
  const response = await fetch(`https://api.replicate.com/v1/predictions/${id}`, {
    headers: {
      'Authorization': `Token ${process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN}`,
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
