'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import GetUserDetails from './GetUserDetails'; // Ensure this is the correct path
import { UserContextType, UserState, UserProfile } from '@/types_db';

export const UserContext = createContext<UserContextType | undefined>(undefined);


export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const supabase = createClient();
  const [currentUser, setCurrentUser] = useState(null);
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

  useEffect(() => {
    fetchUserDetails();
  }, []);

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


    // Auth state listener
    useEffect(() => {
      const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_IN') {
          await fetchUserDetails();
        } else if (event === 'SIGNED_OUT') {
          setCurrentUser(null);
          setUserProfile(prevProfile => ({ ...prevProfile, id: null }));
          setUserState(prevState => ({ ...prevState, profile: false, loading: false }));
        }
      });
  
      return () => {
        if (authListener && authListener.subscription) {
          authListener.subscription.unsubscribe();
        }
      };
    }, []);
  
    

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
