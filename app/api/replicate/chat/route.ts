// Rename this file to reflect the desired endpoint, e.g., 'chat.js'

'use server';
import { NextRequest, NextResponse } from 'next/server';

// Default export named `handler` or any other name
export default async function POST(request: NextRequest) {
  const modelVersion =
    "04e422a9b85baed86a4f24981d7f9953e20c5fd82f6103b74ebc431588e1cec8";

  // Ensure that this endpoint only responds to POST requests
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' });
    return;
  }

  const response = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      version: modelVersion,
      input: { prompt: req.body.prompt },
    }),
  });

  if (response.status !== 201) {
    let error = await response.json();
    res.status(500).json({ detail: error.detail });
    return;
  }

  const prediction = await response.json();
  res.status(201).json(prediction);
}
