// app/api/workflowWebhook/route.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

type WorkflowStatus = 'completed' | 'running' | 'failed';

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
  output: unknown | null;
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
        // Handle completed workflow
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
