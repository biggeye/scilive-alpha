'use client';
import { Box, ChakraProvider } from '@chakra-ui/react';
import { SaasProvider } from '@saas-ui/react';
import { UserProvider } from "@/lib/user/UserProvider";
import { RecoilRoot } from "recoil";
import { HMSRoomProvider } from '@100mslive/react-sdk';
import { sciLiveTheme } from "./theme";
import React from 'react';
import Navbar from "@/components/Navbar";



export const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  
  return (
    <ChakraProvider theme={sciLiveTheme}>
      <SaasProvider>
      <UserProvider>
        <RecoilRoot>
          
          <HMSRoomProvider>
    
            <Navbar />
            <Box as="main" className="main" overflowX="hidden" p={3}>
              {children}
            </Box>
          </HMSRoomProvider>
        </RecoilRoot>
      </UserProvider>
      </SaasProvider>
    </ChakraProvider>
  );
};
