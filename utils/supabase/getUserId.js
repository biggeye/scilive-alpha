

export async function getUserId(supabase) {
    try {
        let { data, error, status } = await supabase
            .from('profiles')
            .select('id');

        if (error && status !== 406) {
            throw error;
        }

        if (data && data.length > 0) {
            return data[0].id; // Return the id of the first object in the array
        } else {
            return null; // Return null if no data is found
        }
    } catch (error) {
        console.error('Error fetching profile IDs:', error.message);
        return null;
    }
};

export async function getMasterContent(supabase) {
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

export async function getUserProfile(supabase) {
    try {
        let { data, error, status } = await supabase.from('profiles').select('*');
        if (error && status !== 406) {
            throw error;
        }
        if (data) {
            return data; // Return the content data
        }
    } catch (error) {
        console.error('Error fetching profile data:', error.message);
        return null;
    }
}