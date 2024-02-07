import { createClient } from "@/utils/supabase/client";

export default async function uploadPrediction(
    content, // This can be either a file URL for images or a narrative text
    userId,
    modelId,
    predictionId,
    prompt,
    contentType // Add a parameter to indicate content type ("image" or "text")
) {
    const supabase = createClient();
    let url = content;
    const user_id = userId;
    const imageModelId = modelId;
    const imagePredictionId = predictionId;
    const imagePrompt = prompt;

    // Check if content is an image that needs to be uploaded
    if (contentType === "image") {
        // Assuming content is a URL to an image that needs to be fetched and uploaded
        const response = await fetch(content);
        const imageBlob = await response.blob();

        const { error } = await supabase.storage
            .from('production')
            .upload(`${imagePredictionId}`, imageBlob, { cacheControl: '3600', upsert: false });

        if (error) {
            console.error('Error uploading image to Supabase:', error);
            throw new Error('Error uploading image to Supabase');
        }

        // Construct the URL to the uploaded image
        url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/production/${imagePredictionId}`;
        console.log('Image uploaded successfully:', user_id, imageModelId, imagePredictionId, imagePrompt, url);
    }

    // Insert the prediction data into the master_content table
    const { data, error: insertError } = await supabase
        .from('master_content')
        .insert([{
            created_by: user_id,
            model_id: imageModelId,
            prediction_id: imagePredictionId,
            prompt: imagePrompt,
            url: contentType === "image" ? url : null, // Store URL only if content is an image
            content: contentType === "text" ? content : null, // Store content if it's narrative text
            content_type: 'replicate_prediction',
            name: contentType === "text" ? 'Narrative Prediction' : null, // Optional, based on your needs
            // Other fields as necessary
        }]);

    if (insertError) {
        console.error('Error posting prediction data to Supabase:', insertError);
        throw new Error('Error posting prediction data to Supabase!');
    }

    return contentType === "image" ? url : content; // Return the URL for images or content for narratives
}
