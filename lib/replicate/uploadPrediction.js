'use server';
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function uploadPrediction(
    content,
    userId,
    modelId,
    predictionId,
    prompt
) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const response = await fetch(content);
    if (!response.ok) {
        throw new Error('Error fetching the content');
    }
    const imageBlob = await response.blob();

    // Attempt to upload the image/content
    const uploadResponse = await supabase.storage
        .from('production')
        .upload(`${predictionId}`, imageBlob, {
            cacheControl: '3600', 
            upsert: true // Ensure this is set to true to allow overwriting
        });

    if (uploadResponse.error) {
        console.error('Error uploading image to Supabase:', uploadResponse.error);
        throw new Error('Error uploading image to Supabase');
    }

    // Construct the URL for the uploaded content
    let url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/production/${predictionId}`;

    // Update the Supabase row with the new URL
    const { data, error } = await supabase
        .from('master_content')
        .update({ url: url })
        .match({ id: predictionId });

    if (error) {
        console.error('Error updating prediction data in Supabase:', error);
        throw new Error('Error updating prediction data in Supabase');
    }

    console.log('Content uploaded and database updated successfully:', url);
    return url; // Return the URL of the uploaded content
}
