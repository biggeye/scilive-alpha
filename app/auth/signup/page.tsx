"use client";

import React, { useState, FormEvent } from 'react';
import { Center } from '@chakra-ui/react';
import SignUp from '@/components/Auth/SignUp';

const Auth: React.FC = () => {

  return (
    <Center>
      <SignUp />
    </Center>
  );
};

export default Auth;
