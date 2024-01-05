'use client';
import { SupabaseProvider } from "@/lib/supabase-provider";
import { Toaster } from 'react-hot-toast';
import { Box, ChakraProvider } from '@chakra-ui/react'
import { UserProvider } from "@/lib/UserProvider";
import Navbar from "@/components/Navbar";
import { createClient } from "@/utils/supabase/client";
import { RecoilRoot } from "recoil";

export const ClientLayout = ({ children }: { children: React.ReactNode }) => {
const supabase = createClient();

  return (
    <RecoilRoot>
      <SupabaseProvider>
        <ChakraProvider>
          <UserProvider supabase={supabase}>
            <Box width="100vw">
              <main>
          <Navbar />
            {children}
            </main>
            </Box>
          <Toaster />
          </UserProvider>
        </ChakraProvider>
      </SupabaseProvider>
      </RecoilRoot>
  );
};
