'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import GetUserDetails from './GetUserDetails'; // Ensure this is the correct path

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
  supabase: any;
}


export const UserContext = createContext<UserContextType | undefined>(undefined);
type UserProviderProps = {
  children: React.ReactNode;
  supabase: any; // replace any with the actual type of supabase
};

export const UserProvider = ({ children, supabase }: UserProviderProps) => {

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
          console.log(userDetails);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        setUserState({ profile: false, error: `Error fetching user details: ${error}`, loading: false });
      }
    }}, []);


    // Auth state listener
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event: any, session: any) => {
      if (session) {
        await GetUserDetails();
      } else {
        setCurrentUser(null);
        setUserProfile(prevProfile => ({ ...prevProfile, id: null }));
        setUserState(prevState => ({ ...prevState, profile: false, loading: false }));
      }
    });
    
    // Cleanup the subscription when the component unmounts
    useEffect(() => {
      return () => {
        if (authListener && authListener.subscription) {
          authListener.subscription.unsubscribe();
        }
      };
    }, [authListener]);
    

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
