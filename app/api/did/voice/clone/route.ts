import fetch from 'node-fetch';
import FormData from 'form-data';
import { NextRequest, NextResponse } from 'next/server';

interface ResponseData {
  message: string;
  // Include other properties as needed
}


export async function POST(request: NextRequest, res: NextResponse) {
  const data = await request.json();
  console.log({ data });

  const dIdFormData = new FormData();
  dIdFormData.append('voice', data.voice);
  dIdFormData.append('name', data.name);

  try {
    const dIdResponse = await fetch(`https://api.d-id.com/tts/voices`, {
      method: 'POST',
      headers: {
        // FormData will set the Content-Type to 'multipart/form-data' with the boundary automatically
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_DID_BEARER_TOKEN}`,
      },
      body: dIdFormData,
    });

    if (!dIdResponse.ok) {
      throw new Error(`Network response was not ok: ${dIdResponse.statusText}`);
    }

    const responseData = (await dIdResponse.json()) as ResponseData;
    const finalResponse = JSON.stringify(responseData);
    // Assuming responseData.message contains the string message you want to return
    return finalResponse;
  } catch (error) {
    console.error("Failed to fetch from d-ID API:", error);
    // Return a generic error message or customize based on error
    return error
  }
}
