'use server'
import { createClient } from "@/utils/supabase/server";
import { cookies } from 'next/headers';

export default async function uploadTrainedModel(model_id: string, model_name: string, user_id: string, model_type: string, number_of_images: number, images: File[]) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const modelId = model_id;
    const modelName = model_name;
    const modelType = model_type;
    const userId = user_id;
    const urls = [];

    for (let i = 0; i < number_of_images; i++) {
        const image = images[i];
        const extension = image.name.split('.').pop();
        const modelDatasetFilename = `${modelId}-${i}.${extension}`;

        const { error: uploadError, data: uploadData } = await supabase.storage
            .from('model-datasets')
            .upload(modelDatasetFilename, image, { cacheControl: '3600', upsert: false });

        if (uploadError) {
            console.error('Error uploading image to Supabase:', uploadError);
            throw new Error('Error uploading image to Supabase');
        }

        const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/model-datasets/${modelDatasetFilename}`;
        console.log('Model Dataset Image Successfully Uploaded:', url);
        urls.push(url);
    }

    const { data: trainedModelData, error: insertModelError } = await supabase
        .from('trained_models')
        .insert({
            created_by: userId,
            name: modelName,
            model_id: modelId,
            model_type: modelType,
            number_of_images: number_of_images,
            image_data: JSON.stringify(urls)
        });

    if (insertModelError) {
        console.error('Error inserting model data:', insertModelError);
        throw new Error('Error inserting model data');
    }

    for (const url of urls) {
        const { error: insertImageError } = await supabase
            .from('trained_models_images')
            .insert({
                model_id: modelId,
                url: url
            });

        if (insertImageError) {
            console.error('Error inserting image data:', insertImageError);
            throw new Error('Error inserting image data');
        }
    }

    console.log('All model dataset images successfully uploaded and database updated.');
}
