'use client'
import { createClient } from '@/utils/supabase/client';
import { createContext, useContext, useEffect, useState } from 'react';

const SupabaseContext = createContext();
const UserContext = createContext();

export default function SupabaseProvider({ children }) {
  const [supabase] = useState(() => createClient());
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const userResponse = await supabase.auth.getUser();
      if (userResponse.data) {
        setUser(userResponse.data);
        setUserId(userResponse.data.id);
      }
    };

    checkUser();

    const subscription = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setUser(session.user);
        setUserId(session.user.id);
      } else {
        setUser(null);
        setUserId(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase.auth]);

  const exposed = {
    user,
    userId,
  };

  return (
    <SupabaseContext.Provider value={{ supabase }}>
      <UserContext.Provider value={exposed}>
        {children}
      </UserContext.Provider>
    </SupabaseContext.Provider>
  );
}


export const useSupabase = () => {
  const supabaseClientContext = useContext(SupabaseContext);
  console.log("useSupabase (via context): ", supabaseClientContext)
  if (!supabaseClientContext) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return supabaseClientContext.supabase;
};

export const useUser = () => {
  const userClientContext = useContext(UserContext);
  console.log("useUser (via context): ", userClientContext)
  if (!userClientContext) {
    throw new Error('useUser must be used within a SupabaseProvider');
  }
  return userClientContext.user;
};

