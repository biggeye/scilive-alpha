// File: /lib/d-id/talks/createTalk.ts
import fetch from 'node-fetch';

export async function createAvatar(avatarScript: string, sourceUrl: string) {
  const didAuth = process.env.NEXT_PUBLIC_DID_BASIC_API;
  console.log(didAuth);
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `${process.env.NEXT_PUBLIC_DID_BASIC_API}`, // Corrected
    },
    body: JSON.stringify({
      script: {
        type: 'text',
        subtitles: 'false',
        provider: { type: 'microsoft', voice_id: 'en-US-JennyNeural' },
        ssml: 'false',
        input: avatarScript,
      },
      config: { fluent: 'false', pad_audio: '0.0' },
      source_url: sourceUrl,
      webhook: 'https://29c1-2603-8000-2700-d75b-00-1258.ngrok-free.app/api/d-id/talk/webhook',
    }),
  };

  try {
    const response = await fetch('https://api.d-id.com/talks', options);
    if (!response.ok) {
      throw new Error('API request failed with status: ' + response.status);
    }
    const responseData = await response.json();
    return responseData; // Return the response data for further processing
  } catch (error) {
    console.error('Error in createAvatar:', error);
    throw error; // Rethrow the error for handling in the API route
  }
}
