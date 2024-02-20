import fetch from 'node-fetch';
import FormData from 'form-data';
import { NextRequest, NextResponse } from 'next/server';
import { Buffer } from 'buffer'; // Ensure Buffer is available in your environment

interface ResponseData {
  message: string;
  // Include other necessary properties
}

export async function POST(request: NextRequest) {
  try {
    // Parse the incoming request as JSON
    const json = await request.json();
    const { voice: voiceDataUri, name } = json;

    // Decode the data URI to a Buffer
    const base64Data = voiceDataUri.split(',')[1]; // Assumes data URI is in the format "data:<type>;base64,<data>"
    const voiceBuffer = Buffer.from(base64Data, 'base64');

    // Create a FormData instance and append the data
    const formData = new FormData();
    // Since we cannot directly append a Buffer to FormData in a Node environment as a file,
    // you might need to simulate a file using a Blob or similar - this step is environment-specific
    // For demonstration, appending the buffer directly. In practice, this may need adjustment.
    formData.append('voice', voiceBuffer, 'filename.mp3');
    formData.append('name', name);

    const dIdResponse = await fetch(`https://api.d-id.com/tts/voices`, {
      method: 'POST',
      headers: {
        // FormData will manage the Content-Type header including boundary
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_DID_BEARER_TOKEN}`,
      },
      body: formData,
    });

    if (!dIdResponse.ok) {
      throw new Error(`Network response was not ok: ${dIdResponse.statusText}`);
    }

    const responseData = await dIdResponse.json() as ResponseData;
    return new NextResponse(JSON.stringify(responseData), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error("Failed to fetch from d-ID API:", error);
    return new NextResponse(JSON.stringify({ error }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}


