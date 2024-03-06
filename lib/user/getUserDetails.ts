'use client';
import { createClient } from "@/utils/supabase/client";
import { UserProfile } from "@/types";
import { UserDetailsResponse } from "@/types";

export default async function getUserDetails(supabase: any): Promise<UserDetailsResponse> {
  try {
    const { data: session, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !session) {
      console.error("Error or no session found:", sessionError);
      return { error: "User not authenticated" };
    }

    const userId = session.session?.user.id;
    if (!userId) {
      return { error: "Can't find User ID" };
    }

    const { data, error } = await supabase
      .from('users')
      .select('id, full_name, username, avatar_url, website, email')
      .eq('id', userId)
      .single();

    if (error) throw error;

    return {
      userId: data.id,
      profile: {
        id: data.id,
        full_name: data.full_name,
        username: data.username,
        avatar_url: data.avatar_url,
        website: data.website,
        email: data.email,
      },
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return { error: "Error fetching user profile" };
  }
}
