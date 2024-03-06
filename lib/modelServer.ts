'use server';

import { createClient } from "@/utils/supabase/server";
const supabase = createClient();


export async function fetchTxt2ImgModels() {
    try {
        const session = await supabase.auth.getSession();
        const { data, error } = await supabase.from('txt2img').select('*');
        if (error) throw error;
        return data; 
    } catch (error) {
        console.error("Error fetching models: ", error);
       throw new Error('Internal Server Error');
    }
}

export async function fetchImg2ImgModels() {
    try {
         const session = await supabase.auth.getSession();
        const { data, error } = await supabase.from('img2img').select('*');
        if (error) throw error;
        return data; 
    } catch (error) {
        console.error("Error fetching models: ", error);
        throw new Error('Internal Server Error');
    }
}

