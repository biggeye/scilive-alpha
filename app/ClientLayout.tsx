'use client'
import React from 'react';
import { AppShell, SaasProvider } from '@saas-ui/react';
import { RecoilRoot } from "recoil";
import NavbarAlpha from '@/components/NavbarAlpha';
import { UserProvider } from '@/lib/user/UserProvider';
import { Box } from '@chakra-ui/react';
import { ClientLayoutProps } from '@/types';

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  const parentRef = React.useRef(null);

  return (
    <SaasProvider>
      <RecoilRoot>
        <UserProvider>
          <Box
            ref={parentRef}
            as="main">
            <AppShell variant="static"
            navbar={<NavbarAlpha parentRef={parentRef} />}>
              {children}
            </AppShell>
          </Box>
        </UserProvider>
        </RecoilRoot>
      </SaasProvider>
  );
};

export default ClientLayout;
