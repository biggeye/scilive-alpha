"use client";

import React, { useState, FormEvent } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Image, Center, FormControl, FormLabel, Input, Button, Box, Text, Link } from '@chakra-ui/react';
import { github, google } from '@/components/Auth/Icons';

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const supabase = createClient();
  const [formData, setFormData] = useState<FormData>({ email: '', password: '' });
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

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
    <Center>
      <Text className="w-full text-center" fontSize="2xl">Sign In</Text>
      <form className="column w-full" onSubmit={handleSubmit}>
        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            placeholder="jane@acme.com"
            type="email"
            onChange={handleChange}
            value={formData.email}
          />
        </FormControl>

        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input
            name="password"
            type="password"
            onChange={handleChange}
            value={formData.password}
          />
        </FormControl>

        <Link href="/reset-password" className="link w-full">
          Forgot your password?
        </Link>

        <Button mt={4} colorScheme="blue" type="submit">
          Submit
        </Button>
      </form>
      {errorMsg && <Text color="red.600">{errorMsg}</Text>}
      <Link href="/sign-up" className="link w-full">
        Don&apos;t have an account? Sign Up.
      </Link>
      <Box mt={4}>
        <Button leftIcon={google} colorScheme="red" onClick={() => handleOAuthLogin('google')}>
          Sign in with Google
        </Button>
        <Button leftIcon={github} colorScheme="gray" onClick={() => handleOAuthLogin('github')}>
          Sign in with GitHub
        </Button>
      </Box>
    </Center>
  );
};

export default Login;
