// Assuming `uploadPrediction` is in a file named uploadPrediction.ts
'use server';

import { createClient } from "@/utils/supabase/service";
import { cookies } from "next/headers";

export async function uploadPrediction(
    content: string,
    userId: string,
    modelId: string,
    predictionId: string,
    prompt: string
): Promise<string> {
    console.log("uploadPrediction (content):", content);
    const cookieStore = cookies();
    const supabase = createClient(cookieStore); // Adjust as needed to match your auth token retrieval

    const response = await fetch(content);
    if (!response.ok) {
        throw new Error('Error fetching the content');
    }
    const imageBlob = await response.blob();

    const uploadResponse = await supabase.storage
        .from('production')
        .upload(`${predictionId}`, imageBlob, {
            cacheControl: '3600', 
            upsert: true
        });

    if (uploadResponse.error) {
        console.error('Error uploading image to Supabase:', uploadResponse.error);
        throw new Error('Error uploading image to Supabase');
    }

    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/production/${predictionId}`;

    // Update the Supabase row with the new URL
    const { data, error } = await supabase
        .from('master_content')
        .update({ url: url })
        .match({ prediction_id: predictionId }); // Ensure this matches your table's primary key or unique identifier

    if (error) {
        console.error('Error updating prediction data in Supabase:', error);
        throw new Error('Error updating prediction data in Supabase');
    }

    console.log('Content uploaded and database updated successfully:', url);
    return url; 
}
