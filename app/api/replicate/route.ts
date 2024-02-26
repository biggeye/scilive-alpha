import { createClient } from '@/utils/supabase/route'

export async function POST(req: Request) {
  const supabase = createClient(req);
  const session = await supabase.auth.getSession();

  if (!session) {
    return new Response(JSON.stringify({
      error: 'not_authenticated',
      description: 'The user does not have an active session or is not authenticated',
    }), { status: 401 });
  }

  try {
    const bodyData = await req.json();
    const { version, user_id, image, pose_image, input_image, prompt } = bodyData;

    // Check for version field
    if (!version) {
      return new Response(JSON.stringify({ error: 'Missing version' }), { status: 400 });
    }

    // Check for at least one other field
    const inputFields = [image, pose_image, input_image, prompt];
    const providedFields = inputFields.filter(field => field !== undefined);

    if (providedFields.length < 1) {
      return new Response(JSON.stringify({ error: 'At least one of image, pose_image, input_image, or prompt is required' }), { status: 400 });
    }

    // Adjust payload as needed for your API call
    const payload = {
      version,
      input: {
        prompt
      },
      webhook: `https://scilive.cloud/api/replicate/webhook/${user_id}`
    };

    // Example API call
    const response = await fetch('https://api.replicate.com/predictions/v1', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (response.status !== 201) {
      const error = await response.json();
      return new Response(JSON.stringify({ detail: error.detail }), { status: response.status });
    }

    const prediction = await response.json();
    return new Response(JSON.stringify(prediction), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal server error', detail: error }), { status: 500 });
  }
}
