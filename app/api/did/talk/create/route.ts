import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/route'

export async function POST(req: Request) {
  const supabase = createClient(req);
  const session = await supabase.auth.getSession();

  // Ensure avatarData is possibly null
  const avatarData = req.body as { avatar_script?: string, source_url?: string } | null;
   console.log("avatarData: ", avatarData)
  if (!session) {
    return new Response(JSON.stringify({
      error: 'not_authenticated',
      description: 'The user does not have an active session or is not authenticated',
    }), { status: 401 });
  }

  // Check if avatarData is not null before accessing properties
  if (avatarData) {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: `Basic ${process.env.NEXT_PUBLIC_DID_BASIC_API}`
      },
      body: JSON.stringify({
        script: {
          type: 'text',
          subtitles: 'false',
          provider: { type: 'microsoft', voice_id: 'en-US-JennyNeural' },
          ssml: 'false',
          input: avatarData.avatar_script,
        },
        config: { fluent: 'false', pad_audio: '0.0' },
        source_url: avatarData.source_url,
      })
    };


  const talkOptions = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Basic ${process.env.NEXT_PUBLIC_DID_BASIC_API}`
    },
  };

  try {
    // Making the API request and capturing the response
    const response = await fetch('https://api.d-id.com/talks', options);
    const responseData = await response.json();
     console.log("responseData: ", responseData);
    const talkId = await responseData.id;
     console.log(talkId);
    // Checking if talkId is available before making the second request
    if (talkId) {
      const talk = await fetch(`https://api.d-id.com/talks/${talkId}`, talkOptions);
      const talkData = await talk.json();
      console.log(talkData);
      // Checking if talkData is available before accessing its properties
      if (talkData) {
        const talkStatus = talkData.status;
        const talkVideo = talkData.result_url;
        const talkPending = talkData.pending_url;

        const talkResponse = {
          talkStatus,
          talkVideo,
          talkPending
        };

        // Logging the response (you can return it to the frontend or perform further actions)
        console.log(responseData);

        // Returning the response to the frontend
        return new Response(JSON.stringify(talkResponse), { status: talkStatus });
      } else {
        // Handle case where talkData is null or undefined
        return new Response(JSON.stringify({
          error: 'talk_data_not_available',
          description: 'Talk data is null or undefined',
        }), { status: 500 });
      }
    } else {
      // Handle case where talkId is null or undefined
      return new Response(JSON.stringify({
        error: 'talk_id_not_available',
        description: 'Talk ID is null or undefined',
      }), { status: 500 });
    }
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({
      error: 'api_request_error',
      description: 'Error occurred while making the API request',
    }), { status: 500 });
  }
}
}