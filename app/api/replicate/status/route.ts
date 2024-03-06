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
    // Properly parse the JSON body
    const body = await req.json();
    const id = body.id;
    console.log("/api/replicate/status: ", id);

    const response = await fetch(`https://api.replicate.com/v1/predictions/${id}`, {
      headers: {
        'Authorization': `Token ${process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    // Check for successful response (typically 200)
    if (!response.ok) {
      const error = await response.json();
      return new Response(JSON.stringify({ detail: error.detail }), { status: response.status });
    }

    const prediction = await response.json();
    return new Response(JSON.stringify(prediction), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({'message': 'Internal server error', 'error': error}), { status: 500 });
  }
}
