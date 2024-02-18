import uploadPredictionRoute from '@/lib/replicate/uploadPredictionRoute';

type WorkflowStatus = 'completed' | 'running' | 'failed';

interface WorkflowOutput {
  images: string[];
  user_id: string;
}

interface WorkflowWebhookRequestBody {
  id: string;
  version_id: string;
  status: WorkflowStatus;
  created_at: string;
  started_at: string | null;
  ended_at: string | null;
  workflow_id: string;
  error: string | null;
  input: Record<string, any>;
  output: WorkflowOutput | null;
}

export async function POST(req: Request) {
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
      const { images, user_id: userId } = body.output;
      const predictionId = body.id;
      const prompt = body.input.avatar_description;
      
      // Use map to create an array of promises from uploadPrediction calls
      const uploadPromises = images.map((image, index) => 
        uploadPredictionRoute(image, userId, "leapAvatar", `${predictionId}-${index}`, prompt)
      );
      
      // Wait for all the uploadPrediction calls to complete
      await Promise.all(uploadPromises);
  }
  

    // Assuming you want to return a success message after processing
    return new Response(JSON.stringify({ message: 'Webhook processed successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
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
