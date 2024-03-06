import { uploadAvatar } from "@/lib/leap/uploadAvatar";
import { WorkflowStatus, WorkflowOutput, WorkflowWebhookRequestBody } from '@/types';


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
      const { images, user_id, avatar_name, photo_style, frame_style, avatar_description } = body.output;
      const userId = user_id;
      const name = avatar_name;
      const prompt = `${photo_style}, ${frame_style}, ${avatar_description}`;
      const predictionId = body.id;
      // Use map to create an array of promises from uploadPrediction calls
      const uploadPromises = images.map((image, index) => 
        uploadAvatar(image, userId, name, "leapAvatar", `${predictionId}-${index}`, prompt)
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