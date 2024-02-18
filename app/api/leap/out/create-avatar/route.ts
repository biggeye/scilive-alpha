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
    const bodyData = await req.json();
    const { avatar_name, avatar_description, user_id } = bodyData;
    console.log(bodyData);    
    const response = await fetch("https://api.workflows.tryleap.ai/v1/runs", {
          method: 'POST',
          headers: {
            'X-Api-Key': `${process.env.NEXT_PUBLIC_LEAP_API_KEY}`,
          },
          body: JSON.stringify({
            workflow_id: "wkf_fENKVAhNzDo2cq",
            webhook_url: "https://scilive.cloud/api/leap/run",
            input: {
              avatar_name: avatar_name,
              avatar_description: avatar_description,
              user_id: user_id,
            }
          }),
        });

    if (response.status !== 201) {
      const error = await response.json();
      return new Response(JSON.stringify({ detail: error.detail }), { status: 500 });
    }

    const prediction = await response.json();
    console.log(prediction);
    return new Response(JSON.stringify(prediction), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}