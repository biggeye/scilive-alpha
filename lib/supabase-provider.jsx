'use client'
import { createClient } from '@/utils/supabase/client';
import { createContext, useContext, useEffect, useState } from 'react';

const SupabaseContext = createContext();
const UserContext = createContext();

export default function SupabaseProvider({ children }) {
  const [supabase] = useState(() => createClient());
  const [user, setUser] = useState(supabase.auth.getUser());
  const [userId, setUserId] = useState(null);

useEffect(() => {
  supabase.auth.onAuthStateChange(() => {
    const user = supabase.auth.getUser();
    if (user) {
      setUser(user);
      setUserId(user.id);
      console.log("user (via onAuthStateChange): ", user);
    }})
}, []);

const exposed = {
  user,
  userId,
}

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

export const useUserId = () => {
  const { userId } = useContext(UserContext);
  if (!userId) {
    throw new Error('useUserId must be used within a SupabaseProvider');
  }
  return userId;
}