"use client";

import React, { useState, FormEvent } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Switch, CardHeader, Card, CardBody, CardFooter, Flex, InputGroup, InputRightAddon, Image, Center, FormControl, FormLabel, Input, Button, Box, Text, Link, Spacer } from '@chakra-ui/react';
import { github, google } from '@/components/Auth/Icons';
import { Router } from 'next/router';

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const supabase = createClient();
  const [isLoginMode, setIsLoginMode] = useState(true); // New state for toggling between Login and Signup
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setErrorMsg(null); // Reset error message on mode change
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    let error;

    if (isLoginMode) {
      const response = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      error = response.error;
    } else {
      const response = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });
      error = response.error;
    }

    if (error) {
      setErrorMsg(error.message);
    }
  };

  const handleOAuthLogin = async (provider: 'google' | 'github') => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_DEFAULT_URL}/auth/callback`,
      },
    });
  };

  return (
    <Card m="3rem" width="90%">
       <CardHeader display="flex">
        {isLoginMode ? 'Login' : 'Signup'}
        <Spacer />
        <Switch isChecked={!isLoginMode} onChange={toggleMode}>Sign-up</Switch>
      </CardHeader>
   <CardBody>
    <Flex alignItems="center" direction="column">
      <form onSubmit={handleSubmit}>
        <Flex direction="row" justifyContent="space-between">
          <InputGroup>
            <FormControl id="email">

              <Input
       
              borderColor="onyx"
                name="email"
                placeholder="username@domain.com"
                type="email"
                onChange={handleChange}
                value={formData.email}
              />
            </FormControl>

            <FormControl id="password">

              <Input
          
              borderColor="onyx"
              placeholder="password"
                name="password"
                type="password"
                onChange={handleChange}
                value={formData.password}
              />
            </FormControl>
            <InputRightAddon>
              <Button type="submit" width="100%">
                {isLoginMode ? 'Login' : 'Signup'}
              </Button>
            </InputRightAddon>
          </InputGroup>
        </Flex>


<Center>

 
<Link size="sm" href="/reset-password" className="link w-full">
          Reset Password
        </Link>
      
        </Center>
      </form>
      {errorMsg && <Text color="red.600">{errorMsg}</Text>}
      </Flex>
      </CardBody>
<CardFooter display="flex" justifyContent="space-around">
      <Spacer />
        <Button leftIcon={google()} colorScheme="gray" onClick={() => handleOAuthLogin('google')} />
        <Spacer />
        <Button leftIcon={github()} colorScheme="gray" onClick={() => handleOAuthLogin('github')} />
     
<Spacer />
      </CardFooter>

    </Card>
  );
};

export default Login;
