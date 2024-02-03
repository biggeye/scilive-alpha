// Correct path: app/api/replicateWebhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import uploadPrediction from '@/lib/replicate/uploadPrediction';
// Assuming updatePredictionStatus and uploadPredictionToSupabase are implemented elsewhere
// import { updatePredictionStatus, uploadPredictionToSupabase } from '@/lib/predictionUtils';

export async function POST(req: NextRequest) {
    // Next.js 14 App Router automatically routes based on the HTTP method, so no need to check req.method

    // Parse the JSON body from the request
    const { status, id, output, version, input } = await req.json();

    // Update prediction status in the UI by updating the Recoil state
    // This function should be implemented to communicate with your frontend via WebSockets or another real-time method
    // updatePredictionStatus(id, status);

    // If the prediction is complete, upload the final prediction to Supabase
    if (status === 'completed' && output) {
        const predictionId = id;
        const modelId = version;
        const prompt = input.prompt; // Correctly extract prompt from the input field
        // Ensure output is an array and extract the first URL if multiple or single present
        let fileUrl = Array.isArray(output) ? output[0] : output;
        // Assuming supabase is an initialized Supabase client available in this scope
        // You might need to import or initialize your Supabase client accordingly
        await uploadPrediction(fileUrl, predictionId, modelId, prompt); // Correct parameters as per your function definition
    }

    // Respond with a message indicating successful processing
    return new NextResponse(JSON.stringify({ message: 'Webhook received and processed successfully.' }), { status: 200 });
}
