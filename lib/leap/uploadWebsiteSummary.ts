// Import necessary functions and types
import { createClient } from "@/utils/supabase/service";
import { UploadWebsiteSummaryProps } from '@/types';

export const uploadWebsiteSummary = async (
    content: string,
    userId: string,
    modelId: string,
    predictionId: string,
    prompt: string
): Promise<UploadWebsiteSummaryProps | null> => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('master_content')
        .insert([{
            created_by: userId,
            model_id: modelId,
            prediction_id: predictionId,
            prompt: prompt,
            content: content || null
        }]);

    if (error) {
        console.error('Error uploading website summary:', error);
        return null;
    }

    return data ? data[0] : null;
};
