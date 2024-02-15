import { NextResponse } from 'next/server';
import fetch from 'node-fetch'; 
import FormData from 'form-data'; 

export async function POST(req: any) {

  const { name, file } = req.body; 

  try {
    const dIdFormData = new FormData();
    dIdFormData.append('name', name);
    dIdFormData.append('file', file); 

    const dIdResponse = await fetch(`https://api.d-id.com/tts/voices`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_DID_BEARER_TOKEN}`, 
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
    return new NextResponse(JSON.stringify({ error: console.error() }), { status: 500 });
  }
}  