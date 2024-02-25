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
    const { user_id, version, image, pose_image, input_image, prompt, negative_prompt, text, text_prompt, custom_voice, img, video_path, stream } = bodyData;
    const input_images = Array.isArray(input_image) ? input_image : [input_image];
    const payload = {
      workflow_id: "wkf_sgNpY4fZBWTSML",
      user_id,
      version,
      input_images,
      prompt,
    };
    
    if (Object.keys(payload.version).length === 0) {
      return new Response(JSON.stringify({ error: 'Missing model Id' }), { status: 400 });
    }
     console.log("Parsed payload: ", payload);
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