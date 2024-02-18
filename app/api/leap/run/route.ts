// app/api/workflowWebhook/route.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import uploadPrediction from '@/lib/replicate/uploadPrediction';

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

export default async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    return new NextResponse('Method Not Allowed', { status: 405 });
  }

  try {
    const body: WorkflowWebhookRequestBody = await req.json();
    // Process the webhook payload here
    console.log('Received webhook for workflow:', body.id);

    // Implement your custom logic based on the workflow status
    switch (body.status) {
      case 'completed':
        const imageArray1 = body.output?.images[0];
        const imageArray2 = body.output?.images[1];
        const imageArray3 = body.output?.images[2];
        const imageArray4 = body.output?.images[3];
        const userId = body.output?.user_id;
        const predictionId = body.id;
        const prompt = body.input.avatar_description;
        
        uploadPrediction(imageArray1, userId, "leapAvatar", predictionId, prompt);
        uploadPrediction(imageArray2, userId, "leapAvatar", predictionId, prompt);
        uploadPrediction(imageArray3, userId, "leapAvatar", predictionId, prompt);
        uploadPrediction(imageArray4, userId, "leapAvatar", predictionId, prompt);
         break;
      case 'running':
        // Handle running workflow
        break;
      case 'failed':
        // Handle failed workflow, possibly using body.error
        break;
    }

    return new NextResponse('Webhook processed successfully', { status: 200 });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
