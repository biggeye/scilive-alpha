'use client';
import React from 'react';
import { Box, ChakraProvider } from '@chakra-ui/react';
import { AppShell, SaasProvider } from '@saas-ui/react';
import { UserProvider } from "@/lib/user/UserProvider";
import { RecoilRoot } from "recoil";
import { HMSRoomProvider } from '@100mslive/react-sdk';
import { sciLiveTheme } from "./theme";
import NewNavbar from '@/components/NewNavbar';

export const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  
  return (
    <ChakraProvider theme={sciLiveTheme}>
      <SaasProvider>
        <UserProvider>
          <RecoilRoot>
            <HMSRoomProvider>
              <AppShell
                navbar={
                  <NewNavbar />
                }>
        
                <Box as="main" className="main" py="2" position="relative">
                  {children}
                </Box>
              </AppShell>
            </HMSRoomProvider>
          </RecoilRoot>
        </UserProvider>
      </SaasProvider>
    </ChakraProvider>
  );
};

