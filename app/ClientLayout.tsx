'use client';
import { Box, Button, ChakraProvider } from '@chakra-ui/react'
import { UserProvider } from "@/lib/UserProvider";
import Navbar from "@/components/Navbar";
import { RecoilRoot } from "recoil";
import { HMSRoomProvider } from '@100mslive/react-sdk';
import { sciLiveTheme } from "./theme";
import React, { useState } from 'react';
import { ChatAssistant } from '@/components/chat/SciChat';

export const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const [isChatOpen, setChatOpen] = useState(false);
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
