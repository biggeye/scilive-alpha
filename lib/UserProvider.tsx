'use client';
import React, { createContext, useState, useEffect, useContext } from "react";
import { SupabaseClient } from '@supabase/supabase-js';
import GetUserDetails from "./GetUserDetails"; // Ensure this is the correct path

interface UserProfile {
  id: string | null;
  full_name: string | null;
  username: string | null;
  avatar_url: string | null;
  website: string | null;
  email: string | null;
}

interface UserState {
  profile: boolean;
  loading: boolean;
  error: string | null;
}

interface UserContextType {
  userState: UserState;
  setUserState: React.Dispatch<React.SetStateAction<UserState>>;
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  supabase: SupabaseClient;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children, supabase }: { children: React.ReactNode, supabase: SupabaseClient }) => {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: null,
    full_name: "",
    username: "",
    avatar_url: "",
    website: "",
    email: "",
  });
  const [userState, setUserState] = useState<UserState>({
    profile: false,
    loading: true,
    error: null,
  });

  const handleSessionAndAvatar = async (session: any) => {
    const expiresAt = new Date(session.expires_at * 1000);
    if (!session) {
      return null;
    } else {
    const { data, error } = await supabase.from("oauth2tokens").insert([
      {
        user_id: session.user.id,
        service: "supabase",
        access_token: session.access_token,
        token_type: session.token_type,
        refresh_token: session.refresh_token,
        expires_in: expiresAt,
        provider: session.user.app_metadata.provider,
      },
    ]).single();  // Include .single() to return the inserted row
  
    if (error) {
      console.error("Error inserting session data:", error.message);
      return;
    }
  
    console.log("Session data inserted:", data);
  
    const avatarUrl = session.user.user_metadata?.avatar_url;
    if (avatarUrl) {
      const { error: updateError } = await supabase
        .from("users")
        .update({ avatar_url: avatarUrl })
        .eq("id", session.user.id);
      if (updateError) {
        console.error("Error updating user avatar:", updateError.message);
      } else {
        console.log("User avatar updated successfully");
      }
    }}
  };
  

  const fetchUserDetails = async () => {
    try {
      const userDetails = await GetUserDetails();
      if (userDetails.error) {
        setUserState({ profile: false, error: userDetails.error, loading: false });
        return;
      }

      if (userDetails.profile) {
        setUserState({
          profile: true,
          loading: false,
          error: null,
        });
        setUserProfile({
          id: userDetails.profile?.id || "",
          full_name: userDetails.profile?.full_name || "",
          username: userDetails.profile?.username || "",
          avatar_url: userDetails.profile?.avatar_url || "",
          website: userDetails.profile?.website || "",
          email: userDetails.profile?.email || "",
        });
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      setUserState({ profile: false, error: `Error fetching user details: ${error}`, loading: false });
    }
  };

  useEffect(() => {
    fetchUserDetails();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          await handleSessionAndAvatar(session);
        }
      }
    );

    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, [supabase]);

  return (
    <UserContext.Provider value={{ userState, setUserState, userProfile, setUserProfile, supabase }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
