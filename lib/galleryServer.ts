'use server'
import { createClient } from "@/utils/supabase/server";
import { GalleryImage, GalleryScript } from '@/types';

const supabase = createClient();

export async function fetchGalleryImages(): Promise<GalleryImage[]> {
   try {
        const { data, error } = await supabase.from('master_content').select('content_id, url, prompt');
        if (error) throw error;
        return data;
    } catch (error) {
        console.error("Error fetching images from gallery: ", error);
        throw new Error('Supabase - Image Fetch Error');
    }
}

export async function fetchGalleryScripts(): Promise<GalleryScript[]> {
    try {
        const { data, error } = await supabase.from('master_content').select('content_id, content, prompt');
        if (error) throw error;
        return data;
    } catch (error) {
        console.error("Error fetching scripts from gallery: ", error)
        throw new Error('Supabase - Script Fetch Error');
    }
}
