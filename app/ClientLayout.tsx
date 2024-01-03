'use client';
import { SupabaseProvider } from "@/lib/supabase-provider";
import { Toaster } from 'react-hot-toast';
import { ChakraProvider } from '@chakra-ui/react'


export const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="px-2 lg:px-8 max-w-8xl mx-auto">
      <SupabaseProvider>
        <ChakraProvider>{children}</ChakraProvider>
      </SupabaseProvider>
      <Toaster />
    </div>
  );
};
