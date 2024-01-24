"use client";

import React, { useState, FormEvent } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Switch, CardHeader, Card, CardBody, CardFooter, Flex, InputGroup, InputRightAddon, Image, Center, FormControl, FormLabel, Input, Button, Box, Text, Link, Spacer } from '@chakra-ui/react';
import { github, google } from '@/components/Auth/Icons';
import { Router } from 'next/router';
import { fadeOut } from '@/app/theme';

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

  const handleFadeOut = () => { fadeOut };

  return (
    <Center>
      <Card
        width={{ base: "80vw", md: "65vw" }}
      >
        <CardHeader display="flex">
          <Spacer />


          <Switch isChecked={!isLoginMode} onChange={toggleMode}>
            {isLoginMode ? 'Login' : 'Signup'}
          </Switch>
          <Spacer />
        </CardHeader>
        <CardBody>

          <form onSubmit={handleSubmit}>
            <Flex direction={{ base: "column", md: "row" }} justifyContent="space-between">

              <FormControl id="email">
                <Input
                  name="email"
                  placeholder="username@domain.com"
                  type="email"
                  onChange={handleChange}
                  value={formData.email}
                />
              </FormControl>
              <FormControl id="password">
                <Input
                  placeholder="password"
                  name="password"
                  type="password"
                  onChange={handleChange}
                  value={formData.password}
                />
              </FormControl>
              <Spacer />
              <Button type="submit" width="100%">
                {isLoginMode ? 'Login' : 'Signup'}
              </Button>
              <Spacer />
            </Flex>
           <Box m="1rem" width="90%" bgColor="seasalt" height="4px" />
            <Flex direction={{ base: "column", md: "row" }} justifyContent="space-between">
            <Spacer />

            <Button width="100%" leftIcon={google()} colorScheme="gray" onClick={() => handleOAuthLogin('google')} />
            <Spacer />
            <Button width="100%" leftIcon={github()} colorScheme="gray" onClick={() => handleOAuthLogin('github')} />

            <Spacer />
            </Flex>
          </form>
          {errorMsg && <Text color="red.600">{errorMsg}</Text>}

        </CardBody>
        <CardFooter display="flex" justifyContent="space-around">

          <Center>
            <Link color="onyx" mt="1rem" size="xs" href="/reset-password" className="link w-full">
              <Button onClick={handleFadeOut}>
              Reset Password
              </Button>
            </Link>
          </Center>
        </CardFooter>
      </Card>
    </Center>
  );
};

export default Login;
