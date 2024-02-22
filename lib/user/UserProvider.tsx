'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import getUserDetails from './getUserDetails';
import { UserContextType, UserState, UserProfile } from '@/types';
import { AuthProvider } from '@saas-ui/auth';
import { createAuthService } from '@saas-ui/supabase';

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const supabase = createClient();
  const [currentUser, setCurrentUser] = useState({});
  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: '',
    full_name: '',
    username: '',
    avatar_url: '',
    website: '',
    email: ''
  });
  
  const [userState, setUserState] = useState<UserState>({
    profile: false,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const init = async () => {
      try {
        const session = await supabase.auth.getSession();
        setCurrentUser(session.data.session?.user || {});
        
        const userDetails = await getUserDetails(supabase);
        if (userDetails.error) {
          setUserState({ profile: false, error: userDetails.error, loading: false });
          return;
        }
        if (userDetails.profile) {
          setUserState({ profile: true, loading: false, error: null });
          setUserProfile(userDetails.profile);
        }
      } catch (error) {
        console.error("Initialization error:", error);
        setUserState({ profile: false, error: `Initialization error: ${error}`, loading: false });
      }
    };

    init();
  }, [supabase]);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setCurrentUser(session?.user || {});
        getUserDetails(supabase); // This needs to be defined or imported
      } else if (event === 'SIGNED_OUT') {
        setCurrentUser({});
        setUserProfile(prevProfile => ({
          ...prevProfile,
          id: null, // Assuming 'id' can be null according to your UserProfile type definition
          full_name: prevProfile?.full_name ?? "",
          username: prevProfile?.username ?? "",
          avatar_url: prevProfile?.avatar_url ?? "",
          website: prevProfile?.website ?? "",
          email: prevProfile?.email ?? ""
        }));
           setUserState(prevState => ({ ...prevState, profile: false, loading: false }));
      }
    });

    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, [supabase]);

  return (
    <AuthProvider {...createAuthService(supabase)}>
    <UserContext.Provider value={{ userState, setUserState, userProfile, setUserProfile, supabase }}>
      {children}
    </UserContext.Provider>
    </AuthProvider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
