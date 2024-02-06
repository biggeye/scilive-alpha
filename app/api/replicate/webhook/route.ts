// Assuming uploadPrediction is exported and accessible
import uploadPrediction from '@/lib/replicate/uploadPrediction';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/route';
import { useUserContext } from '@/lib/UserProvider';

export async function POST(req: NextRequest) {
    const supabase = createClient(req);
    const { status, id, output, version, input } = await req.json();
    const fileUrl = Array.isArray(output) ? output[0] : output;
    const prompt = input.prompt;
    const userProfile = useUserContext();
    const userId = userProfile?.userProfile?.id;

    if (status === 'succeeded' && output) {
         try {
            const uploadUrl = await uploadPrediction(
                fileUrl,
                userId,
                version,
                id,
                prompt
            );

            console.log('Upload URL:', uploadUrl);
        } catch (error) {
            console.error('Error uploading prediction:', error);
            // Handle error (possibly return an error response)
        }
    }

    return new NextResponse(JSON.stringify({ message: 'Webhook processed successfully.' }), { status: 200 });
}
