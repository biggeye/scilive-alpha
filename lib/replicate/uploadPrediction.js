export default async function uploadPrediction(
    fileUrl,
    userId,
    modelId,
    predictionId,
    prompt,
    supabase
  ) {
      const imagePrompt = prompt;
      const imageModelId = modelId;
      const imagePredictionId = predictionId;
  
      const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/production_replicate/${imagePredictionId}`;
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
      .from('replicate_predictions')
      .insert([
        {
          user_id: user_id,
          modelid: imageModelId,  // changed from modelId
          predictionid: imagePredictionId,  // changed from predictionId
          prompt: imagePrompt,
          url: url,
        },
      ]);
    
  
      if (error2) {
        console.error('Error posting image data to Supabase:', error2);
        throw new Error('Error posting image data to Supabase!');  
      }
  
      return url;
   
  };