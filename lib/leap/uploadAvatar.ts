// Assuming you're using this utility function outside of a React component directly
import { createClient } from "@/utils/supabase/service";
import { cookies } from "next/headers";
import { UploadAvatarProps } from '@/types';

export const uploadAvatar = async (
    image: string,
    userId: string,
    name: string,
    modelId: string,
    predictionId: string,
    prompt: string
): Promise<string> => {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const avatar_name = name;
    let url = image;
    const user_id = userId;
    const imageModelId = modelId;
    const imagePredictionId = predictionId;
    const imagePrompt = prompt;

    // Fetch the image and convert it to a blob
    const response = await fetch(image);
    const imageBlob = await response.blob();

    // Upload the imageBlob to Supabase Storage
    const { error } = await supabase.storage
        .from('avatars')
        .upload(`${imagePredictionId}`, imageBlob, { cacheControl: '3600', upsert: false });

    if (error) {
        console.error('Error uploading image to Supabase:', error);
        throw new Error('Error uploading image to Supabase');
    }

    // Construct the URL to the uploaded image
    url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${imagePredictionId}`;
    console.log('Image uploaded successfully:', user_id, imageModelId, imagePredictionId, imagePrompt, url);

    // Insert the prediction data into the master_content table
    const { data, error: insertError } = await supabase
        .from('master_content')
        .insert([{
            created_by: user_id,
            name: avatar_name,
            model_id: imageModelId,
            prediction_id: imagePredictionId,
            prompt: imagePrompt,
            url: url // Assuming URL is always available at this point
        }]);

    if (insertError) {
        console.error('Error posting prediction data to Supabase:', insertError);
        throw new Error('Error posting prediction data to Supabase!');
    }

    return url; // Return the URL for images or content for narratives
};
