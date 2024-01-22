'use client';
import { Box, ChakraProvider } from '@chakra-ui/react';
import { UserProvider } from "@/lib/UserProvider";
import { RecoilRoot } from "recoil";
import { HMSRoomProvider } from '@100mslive/react-sdk';
import { sciLiveTheme } from "./theme";
import React from 'react';
import Navbar from "@/components/Navbar";

export const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  
  return (
    <ChakraProvider theme={sciLiveTheme}>
      <UserProvider>
        <RecoilRoot>
          <HMSRoomProvider>
            <Navbar />
            <Box as="main" className="main" overflowX="hidden" >
              {children}
            </Box>
          </HMSRoomProvider>
        </RecoilRoot>
      </UserProvider>
    </ChakraProvider>
  );
};
