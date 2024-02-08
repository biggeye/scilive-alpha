import uploadPrediction from '@/lib/replicate/uploadPrediction';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/route';

// Import a method to extract user information from the request, specific to your authentication solution
import { extractUserIdFromRequest } from '@/lib/extractUserIdFromRequest';

export async function POST(req: NextRequest) {
    const supabase = createClient(req);

    const userId = await extractUserIdFromRequest(req);

    const { status, id, output, version, input } = await req.json();
    const content = Array.isArray(output) ? output[0] : output;
    const prompt = input.prompt;

    if (status === 'succeeded' && output && userId) {
        try {
            const uploadUrl = await uploadPrediction(
                content,
                userId,
                version,
                id,
                prompt
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

