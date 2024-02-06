import { createClient } from "@/utils/supabase/client";
export default async function uploadPrediction(
    fileUrl,
    userId,
    modelId,
    predictionId,
    prompt
  ) {
      const supabase = createClient();
      const imagePrompt = prompt;
      const imageModelId = modelId;
      const imagePredictionId = predictionId;
  
      const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/production/${imagePredictionId}`;
      const user_id = userId;
  
      const response = await fetch(fileUrl);
      const imageBlob = await response.blob();
      
  
    
      const { bucket, error } = await supabase.storage
        .from('production')
        .upload(`${imagePredictionId}`, imageBlob, { cacheControl: '3600', upsert: false });
  
      if (error) {
        console.error('Error uploading image to Supabase:', error);
        throw new Error('Error uploading image to Supabase');
      }
  
      console.log('Image uploaded successfully:');
      console.log( user_id, imageModelId, imagePredictionId, imagePrompt, url);
      const { table, error2 } = await supabase
      .from('master_content')
      .insert([
        {
          created_by: user_id,
          model_id: imageModelId,  // changed from modelId
          prediction_id: imagePredictionId,  // changed from predictionId
          prompt: imagePrompt,
          url: url,
          content_type: 'replicate_prediction'
        },
      ]);
    
  
      if (error2) {
        console.error('Error posting image data to Supabase:', error2);
        throw new Error('Error posting image data to Supabase!');  
      }
  
      return url;
   
  };