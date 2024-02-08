import uploadPrediction from '@/lib/replicate/uploadPrediction';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/route';

// Import a method to extract user information from the request, specific to your authentication solution
import { extractUserIdFromRequest } from '@/lib/extractUserIdFromRequest';

export async function POST(req: NextRequest) {
    const supabase = createClient(req);

    // Use a dedicated function to extract the user ID from the request.
    // This function's implementation will depend on your auth setup.
    const userId = await extractUserIdFromRequest(req);

    const { status, id, output, version, input } = await req.json();
    const content = Array.isArray(output) ? output[0] : output;
    const prompt = input.prompt;

    // Determine content type based on output
    let contentType = 'text';
    if (typeof output === 'string' && (output.startsWith('http') || output.startsWith('https'))) {
        contentType = 'image';
    }

    if (status === 'succeeded' && output && userId) {
        try {
            const uploadUrl = await uploadPrediction(
                content,
                userId,
                version,
                id,
                prompt,
                contentType
            );
            if (!uploadUrl) {
                return new NextResponse(JSON.stringify({ message: "uploadPrediction failed" }), { status: 500 });
            }
            console.log('Upload URL:', uploadUrl);
        } catch (error) {
            console.error('Error uploading prediction:', error);
            // Consider returning an error response here
        }
    } else {
       
    }

    return new NextResponse(JSON.stringify({ message: 'Webhook processed successfully.' }), { status: 200 });
}

