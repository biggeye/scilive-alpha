"use client";

import React, { useState, FormEvent } from 'react';
import { createClient } from '@/utils/supabase/client';
import {  Center } from '@chakra-ui/react';

import NewLogin from '@/components/Auth/NewLogin';

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {

  return (
    <Center>
      <NewLogin />

    </Center>
  );
};

export default Login;
