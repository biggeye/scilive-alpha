'use client';
import { Box, ChakraProvider } from '@chakra-ui/react'
import { UserProvider } from "@/lib/UserProvider";
import Navbar from "@/components/Navbar";
import { RecoilRoot } from "recoil";
import { HMSRoomProvider } from '@100mslive/react-sdk';
import { sciLiveTheme } from "./theme";

export const ClientLayout = ({ children }: { children: React.ReactNode }) => {

  return (
    <UserProvider>
      <RecoilRoot>
        <ChakraProvider theme={sciLiveTheme}>
          <HMSRoomProvider>
              
              <Navbar />
              <Box as="main" className="main">
              {children}
              </Box>
          </HMSRoomProvider>
        </ChakraProvider>
      </RecoilRoot>
    </UserProvider>
  );
};
