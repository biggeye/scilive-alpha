import { createClient } from '@/utils/supabase/route'

export async function POST(req: Request) {
  const supabase = createClient(req);
  const session = await supabase.auth.getSession();

  if (!session) {
    return new Response(JSON.stringify({
      error: 'not_authenticated',
      description: 'The user does not have an active session or is not authenticated',
    }), { status: 401 })
  }

  try {
    const bodyData = await req.json()
    const { version, image, input_image, prompt, negative_prompt, text, text_prompt, custom_voice, img, video_path, stream } = bodyData

    const payload = {
      version,
      input: {
        ...(stream && { stream }),
        ...(image && { image }),
        ...(input_image && { input_image }),
        ...(prompt && { prompt }),
        ...(negative_prompt && { negative_prompt }),
        ...(text && { text }),
        ...(text_prompt && { text_prompt }),
        ...(custom_voice && { custom_voice }),
        ...(img && { img }),
        ...(video_path && { video_path }),
      },
      webhook: "https://scilive.cloud/api/replicate/webhook",
    };

    if (Object.keys(payload.input).length === 0) {
      return new Response(JSON.stringify({ error: 'Missing input parameters' }), { status: 400 });
    }

    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN}`,
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

