import uploadPrediction from "@/lib/replicate/uploadPrediction";


type WorkflowStatus = 'completed' | 'running' | 'processing' | 'failed';

interface WorkflowOutput {
  images: string[];
  user_id: string;
  avatar_name: string;
  avatar_description: string;
  photo_style: string;
  frame_style: string;
}

interface PredictionResponsePostBody {
  id: string;
  model: string;
  version: string;
  input: {
    image: string; // Assuming base64 image data is a string
    prompt: string;
  };
  logs: string;
  output: string[];
  error: null | string;
  status: 'starting' | 'processing' | 'succeeded' | 'failed' | 'cancelled'; // Adjust based on possible values
  created_at: string;
  started_at: string;
  completed_at: string;
  webhook: string;
  urls: {
    cancel: string;
    get: string;
  };

  metrics: {
    predict_time: number;
  };
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
    const body: PredictionResponsePostBody = await req.json();
    const cancelUrl = body.urls.cancel;
    console.log('Received webhook for workflow:', body.id);
    if (body.status === 'starting') {
      const status = body.status;

    }
    // Additional code for handling other parts of the request
    if (body.status === 'processing') {
      const progress = body.logs;

    }

    if (body.status === 'succeeded' && body.output) {
      const { id, output } = body;
      const predictionId = id;
      const prompt = body.input.prompt; // Corrected access to prompt

      // Check if output is an array and handle accordingly
      if (Array.isArray(output) && output.every(item => typeof item === 'string')) {
        const uploadPromises = output.map((image, index) =>
          uploadPrediction(image, `${predictionId}-${index}`, prompt)
        );

        await Promise.all(uploadPromises)
          .then(results => {
            // handle successful uploads
          })
          .catch(error => {
            // handle errors
          });
      } else if (typeof output === 'string') {
       console.log("uploadPrediction: ", output, predictionId, prompt)
        await uploadPrediction(output, `${predictionId}-0`, prompt)
          .then(result => {
            
          })
          .catch(error => {
        
          });
      } else {
        console.error('output is neither an array of strings nor a string');
      }

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