import { createContext, useContext } from 'react';
import { createClient } from '@supabase/supabase-js';

// Create a context for the Supabase client
const SupabaseContext = createContext();

export const SupabaseProvider = ({ children }) => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  // Provide the Supabase client to child components
  return (
    <SupabaseContext.Provider value={supabase}>
      {children}
    </SupabaseContext.Provider>
  );
};

// Custom hook to use the Supabase client
export const useSupabase = () => {
  const supabase = useContext(SupabaseContext);
  return supabase;
};

// Custom hook to get the current user
