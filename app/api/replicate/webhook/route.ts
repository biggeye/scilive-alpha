// app/api/replicateWebhook/route.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import uploadPrediction from '@/lib/replicate/uploadPrediction';
// Assuming updatePredictionStatus and uploadPredictionToSupabase are implemented elsewhere
// import { updatePredictionStatus, uploadPredictionToSupabase } from '@/lib/predictionUtils';

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { status, id, output, version, input } = req.body;

        // Update prediction status in the UI by updating the Recoil state
        // This function should be implemented to communicate with your frontend via WebSockets or another real-time method
        // updatePredictionStatus(id, status);

        // If the prediction is complete, upload the final prediction to Supabase
        if (status === 'succeeded' && output) {
            const predictionId = id;
            const modelId = version;
            const prompt = input.prompt; // Correctly extract prompt from the input field
            // Ensure output is an array and extract the first URL if multiple or single present
            let fileUrl = Array.isArray(output) ? output[0] : output;
            // Assuming supabase is an initialized Supabase client available in this scope
            // You might need to import or initialize your Supabase client accordingly
            await uploadPrediction(fileUrl, predictionId, modelId, prompt); // Correct parameters as per your function definition
        }

        return res.status(200).json({ message: 'Webhook received and processed successfully.' });
    } else {
        return res.setHeader('Allow', ['POST']).status(405).end(`Method ${req.method} Not Allowed`);
    }
}
