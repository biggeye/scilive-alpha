import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function uploadPrediction(
    content, // This can be either a file URL for images or a narrative text
    userId,
    modelId,
    predictionId,
    prompt
) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    let url = content;
    const user_id = userId;
    const imageModelId = modelId;
    const imagePredictionId = predictionId;
    const imagePrompt = prompt;

        const response = await fetch(content);
        const imageBlob = await response.blob();

        const { error } = await supabase.storage
            .from('production')
            .upload(`${imagePredictionId}`, imageBlob, { cacheControl: '3600', upsert: false });

        if (error) {
            console.error('Error uploading image to Supabase:', error);
            throw new Error('Error uploading image to Supabase');
        }

        url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/production/${imagePredictionId}`;
        console.log('Image uploaded successfully:', user_id, imageModelId, imagePredictionId, imagePrompt, url);

    const { data, error: insertError } = await supabase
        .from('master_content')
        .insert([{
            created_by: user_id,
            model_id: imageModelId,
            prediction_id: imagePredictionId,
            prompt: imagePrompt,
            url: url || null
          }]);

    if (insertError) {
        console.error('Error posting prediction data to Supabase:', insertError);
        throw new Error('Error posting prediction data to Supabase!');
    }

    return url; // Return the URL for images or content for narratives
}




  // Insert data into a table
  const { data, error } = await supabase
    .from('table_name')
    .insert([{ column_name: 'value' }])

  if (error) return res.status(500).json({ error: error.message })
  return res.status(200).json({ data })
