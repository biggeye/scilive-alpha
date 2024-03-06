import { Leap } from "@leap-ai/workflows";

export async function POST(req: Request) {

  try {
    const bodyData = await req.json();
    const host_name = bodyData.host;
    const podcast_name = bodyData.podcast;
    const webpage_url = bodyData.webpage_url;

    const leap = new Leap({
      apiKey: "le_2063514b_i5qgFukiMYVcCKDBK00U6Mgp",
    });

    const response = await leap.workflowRuns.workflow(
      {
        workflow_id: "wkf_U3tsr91oDF9UaL",
        webhook_url:
          "https://29c1-2603-8000-2700-d75b-00-1258.ngrok-free.app/api/leap/websummary/hook",
        input: {
          webpage_url: webpage_url,
          host: host_name,
          podcast: podcast_name,
        },
      },
    );
    if (response.status !== 201) {
      const error = await response;
      return new Response(JSON.stringify({ detail: error }), { status: 500 });
    }


    console.log(response);
    // Adjusted to return the initial response indicating the workflow is running
    return new Response(JSON.stringify({
      id: response.data.id,
      status: response.data.status,
      created_at: response.data.created_at,
      workflow_id: response.data.workflow_id,
      input: response.data.input,
      output: response.data.output, // This will be null if the workflow is still running
    }), { status: 201 });

  } catch (error) {
    // Check if the error is an instance of Error to access its message property
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error(error);
    return new Response(JSON.stringify({ error: 'Internal server error', details: errorMessage }), { status: 500 });
  }
}