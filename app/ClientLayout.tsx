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
    <UserProvider>
      <RecoilRoot>
        <ChakraProvider theme={sciLiveTheme}>
          <HMSRoomProvider>
            <Navbar />
            <Box as="main" className="main">
              {children}
              <Button className="chatButton" onClick={() => setChatOpen(true)}>Open Chat</Button>
              <ChatAssistant isOpen={isChatOpen} onClose={() => setChatOpen(false)} />
            </Box>
          </HMSRoomProvider>
        </ChakraProvider>
      </RecoilRoot>
    </UserProvider>
  );
};
