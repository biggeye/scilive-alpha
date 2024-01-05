import React, { createContext, useState, useEffect, useContext } from "react";
import GetUserDetails from "./GetUserDetails";

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
  supabase: any;  // Keeping supabase as any due to current package limitations
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children, supabase }: { children: React.ReactNode, supabase: any }) => {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: "",
    full_name: "",
    username: "",
    avatar_url: "",
    website: "",
    email: "",
  });
  const [userState, setUserState] = useState<UserState>({
    profile: false,
    loading: true,
    error: ""
  })

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDetails = await GetUserDetails();

        if (userDetails.error) {
          setUserState({ profile: false, error: userDetails.error, loading: false });
          return;
        }
   
        else if (userDetails.profile) {
        setUserState({
          profile: true,  // Ensuring it's either UserProfile or null
          loading: false,
          error: null,
        });
        setUserProfile({
          id: userDetails.profile?.id || "",
          full_name: userDetails.profile?.full_name || "",
          username: userDetails.profile?.username || "",
          avatar_url: userDetails.profile?.avatar_url || "",
          website: userDetails.profile?.website || "",
          email: userDetails.profile?.website || "",
        })
      };

      } catch (error) {
        console.error("Error fetching user details:", error);
        setUserState({ profile: false, error: `Error fetching user details: ${error}`, loading: false });
      }
    };

    fetchUserDetails();
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
