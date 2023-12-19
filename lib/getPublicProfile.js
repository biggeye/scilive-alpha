'use server'

import { createClient } from "../utils/supabase/server";
import { cookies } from "next/headers";

const cookieStore = cookies();
const supabase = createClient(cookieStore);

export async function getUserId() {

    try {
        let { data, error, status } = await supabase
            .from('profiles')
            .select('id');

        if (error && status !== 406) {
            throw error;
        }

        if (data && data.length > 0) {
            return data[0].id;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error fetching profile IDs:', error.message);
        return null;
    }
};

export async function getMasterContent() {
    
    try {
        let { data, error, status } = await supabase
            .from('master_content')
            .select('*');

        if (error && status !== 406) {
            throw error;
        }
        if (data) {
            return data; // Return the content data
        }
    } catch (error) {
        console.error('Error fetching master_content:', error.message);
        return null;
    }
};

export async function getProfile() {
    
    try {
        let { data, error, status } = await supabase
        .from('profiles')
        .select('*');

        if (error && status !== 406) {
            throw error;
        }
        if (data) {
            console.log("profile: ", data);
            return data; // Return the content data
        }
    } catch (error) {
        console.error('Error fetching profile data:', error.message);
        return null;
    }
};

