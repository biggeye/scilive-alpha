'use client';
import { SupabaseProvider } from "@/lib/supabase-provider";
import { Toaster } from 'react-hot-toast';
import { Box, ChakraProvider } from '@chakra-ui/react'
import { UserProvider } from "@/lib/UserProvider";
import Navbar from "@/components/Navbar";
import { createClient } from "@/utils/supabase/client";
import { RecoilRoot } from "recoil";
import { HMSRoomProvider } from '@100mslive/react-sdk';
import { sciLiveTheme } from "./theme";

export const ClientLayout = ({ children }: { children: React.ReactNode }) => {

  const supabase = createClient();

  return (
<SupabaseProvider>
    <UserProvider supabase={supabase}>
      <RecoilRoot>
        <ChakraProvider theme={sciLiveTheme}>
          <HMSRoomProvider>
            <Box width="100vw">
              <main>
                <Navbar />
                {children}
              </main>
            </Box>
            <Toaster />
          </HMSRoomProvider>
        </ChakraProvider>
      </RecoilRoot>
    </UserProvider>
    </SupabaseProvider>

  );
};
