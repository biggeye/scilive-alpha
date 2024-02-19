import { createClient } from "@/utils/supabase/service";
import { cookies } from "next/headers";

export default async function uploadWebsiteSummary(
    content, 
    userId,
    modelId,
    predictionId,
    prompt
) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    let voiceover = content;
    const user_id = userId;
    const voiceoverModelId = modelId;
    const voiceoverPredictionId = predictionId;
    const voiceoverPrompt = prompt;
    
   
    const { data, error: insertError } = await supabase
        .from('master_content')
        .insert([{
            created_by: user_id,
            model_id: voiceoverModelId,
            prediction_id: voiceoverPredictionId,
            prompt: voiceoverPrompt,
            content: voiceover || null
        }]);

    if (insertError) {
        console.error('Error posting voiceover script to Supabase:', insertError);
        throw new Error('Error posting voiceover script to Supabase!');
    }

    return content; 
}
