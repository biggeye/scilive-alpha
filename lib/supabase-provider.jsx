'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export const SupabaseContext = createContext(null);

export const SupabaseProvider = ({ children }) => {
  const supabase = createClient();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Set the initial user
    const user = supabase.auth.getUser();
    setCurrentUser(user);

    // Auth state listener
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        // When the user logs in or the session is refreshed
        setCurrentUser(session.user);
      } else {
        // When the user logs out
        setCurrentUser(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe(); // Clean up the listener on unmount
    };
  }, [supabase]);

  return (
    <SupabaseContext.Provider value={{ supabase, currentUser }}>
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (context === undefined) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context;
};
