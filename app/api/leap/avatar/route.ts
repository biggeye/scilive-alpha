export async function POST(req: Request) {

   try {
    const bodyData = await req.json();
    const avatar_name = bodyData.avatar_name;
    const avatar_description = bodyData.avatar_description;
    const user_id = bodyData.user_id;
    
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
    // Check if the error is an instance of Error to access its message property
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error(error);
    return new Response(JSON.stringify({ error: 'Internal server error', details: errorMessage }), { status: 500 });
  }
}