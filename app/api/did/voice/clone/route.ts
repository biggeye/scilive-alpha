import fetch from 'node-fetch'; 
import FormData from 'form-data'; 
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest, res: Response) {
 const data = await request.json();
 console.log({ data });

      const dIdFormData = new FormData();
      
      const dIdResponse = await fetch(`https://api.d-id.com/tts/voices`, {
        method: 'POST',
        headers: {
          // FormData will set the Content-Type to 'multipart/form-data' with the boundary automatically
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_DID_BEARER_TOKEN}`,
        },
        body: data,
      });
   };