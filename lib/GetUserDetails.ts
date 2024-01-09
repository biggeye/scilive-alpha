import { Database } from "@/types_db";
import { createClient } from "@/utils/supabase/client";

interface UserProfile {
  id: string;
  full_name: string;
  username: string;
  avatar_url: string;
  website: string;
  email: string;
}

interface UserDetailsResponse {
  userId?: string;
  profile?: UserProfile;
  error?: string;
}

export default async function GetUserDetails(): Promise<UserDetailsResponse> {

const supabase = createClient();

const { data: session, error: sessionError } = await supabase.auth.getSession();

if (sessionError || !session) {
  console.error("Error or no session found:", sessionError);
  return { error: "User not authenticated" };
}

  try {

    const userId = session.session?.user.id;
    console.log("GetUserDetails (session.session?.user.id): ", userId);
    if (!userId) {
      return { error: "Can't find User ID"};
    }

    const { data, error } = await supabase
      .from('users') // Removed the generic type argument
      .select(`id, full_name, username, avatar_url, website, email`)
      .eq('id', userId)
      .single();

    if (error) throw error;
    console.log("Errors: ", error, "Data: ", data);
    return {
      userId: data.id,
      profile: {
        id: data.id, // Include 'id' here
        full_name: data.full_name,
        username: data.username,
        avatar_url: data.avatar_url,
        website: data.website,
        email: data.email,
      }
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return { error: "Error fetching user profile" };
  }
}
