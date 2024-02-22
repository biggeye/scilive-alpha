import React, { useState } from 'react';
import { Card, CardHeader, CardBody } from '@chakra-ui/react';
import { Auth } from '@saas-ui/auth';
import { Snackbar } from '@saas-ui/react';
import Logo from '../Logo';
import { github, google } from '@/components/Auth/Icons';

const getAbsoluteUrl = (path: string) => {
  if (typeof window === 'undefined') {
    return path;
  }
  return window.location.origin;
};

const NewLogin: React.FC = () => {
  // State to manage if the user is new (signup) or not (login)
  const [isNewUser, setIsNewUser] = useState(true);

  // Toggle function to switch between login and signup views
  const toggleAuthView = () => setIsNewUser(!isNewUser);

  return (
    <Card flex="1" maxW="400px">
      <CardHeader display="flex" alignItems="center" justifyContent="center">
        <Logo />
      </CardHeader>
      <CardBody>

          <Auth
            view="signup"
            providers={{
              github: {
                icon: github,
                name: 'Github'
              },
              google: {
                icon: google,
                name: 'Google'
              }
              // Include other providers as necessary
            }}
        
          />
    
      </CardBody>
    </Card>
  );
};

export default NewLogin;
