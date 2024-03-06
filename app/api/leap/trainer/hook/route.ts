import { uploadTrainedModel } from "@/lib/leap/uploadTrainedModel";
import { createClient } from "@/utils/supabase/route";
import { WorkflowStatus, WorkflowOutput, WorkflowWebhookRequestBody } from "@/types";


export async function POST(req: Request) {
  const supabase = createClient(req);
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({
      error: 'Method Not Allowed',
      description: 'This endpoint only supports POST requests.',
    }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const body: WorkflowWebhookRequestBody = await req.json();
    console.log('Received webhook for workflow:', body.id);

    if (body.status === 'completed' && body.output) {
      const model_id = body.id;
      const user_id = body.output.user_id;
      await supabase.from("trained_models").update({ is_completed: true }).eq('id', model_id);



      // Assuming you want to return a success message after processing
      return new Response(JSON.stringify({ message: 'Webhook processed successfully' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new Response(JSON.stringify({
      status: 'error',
      message: 'Internal Server Error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}