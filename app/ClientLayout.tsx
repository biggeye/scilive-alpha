'use client';
import React, { useEffect } from 'react';
import { Box, ChakraProvider } from '@chakra-ui/react';
import { AppShell, SaasProvider } from '@saas-ui/react';
import { UserProvider } from "@/lib/user/UserProvider";
import { RecoilRoot } from "recoil";
import { sciLiveTheme } from "./theme";
import NewNavbar from '@/components/NewNavbar';

export const ClientLayout = ({ children }: { children: React.ReactNode }) => {
 

  return (
    <ChakraProvider theme={sciLiveTheme}>
      <SaasProvider>
        <UserProvider>
          <RecoilRoot>
           
              
              <AppShell
                navbar={
                  <NewNavbar />
                }>
        
                <Box as="main" className="main" py="2" position="relative">
                  {children}
                </Box>
              </AppShell>
  
          </RecoilRoot>
        </UserProvider>
      </SaasProvider>
    </ChakraProvider>
  );
};

