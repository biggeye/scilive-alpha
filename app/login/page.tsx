"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Ensure this path is correct
import {
  Flex,
  VStack,
  InputGroup,
  Spacer,
  Button,
  FormControl,
  Input,
} from "@chakra-ui/react";
import { createClient } from "@/utils/supabase/client";
import { GitHubLogo, GoogleLogo } from "@/public/logos";

function Login() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleGitHubLogin = async (event: { preventDefault: any; }) => {
    event.preventDefault;
    try {
      await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: `${process.env.NEXT_PUBLIC_DEFAULT_URL}/auth/callback`,
        },
      });
    } catch (error) {
      console.error("GitHub login error:", error);
    }
  };

 
  const handleGoogleLogin = async (event: { preventDefault: any; }) => {
    event.preventDefault;
    try {
      await supabase.auth.signInWithOAuth({
        provider: "google",    options: {
          redirectTo: `${process.env.NEXT_PUBLIC_DEFAULT_URL}/auth/callback`,
        },
      });
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  async function handleSignUp(event: { preventDefault: () => void; }) {
    event.preventDefault(); 

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_DEFAULT_URL}/auth/confirm`,
      },
    });

    if (error) {
      console.error("Signup error:", error.message);
    } else {
      console.log("Signup success:", data);
      router.push(`${process.env.NEXT_PUBLIC_DEFAULT_URL}/auth/confirm`);
    }
  }

  async function handleLogIn(event: { preventDefault: () => void; }) {
    event.preventDefault(); // Prevent default form submission behavior

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.error("Login error:", error.message);
    } else {
      console.log("Login success:", data);
      router.push(`${process.env.NEXT_PUBLIC_DEFAULT_URL}/auth/confirm`);
    }
  }

  return (
    <Flex direction="column" alignItems="center">
      <FormControl>
        <VStack>
          <Input
            id={`email-input`}
            size="xs"
            w="50%"
            mt="3"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
          />
          <Input
            id={`pw-input`}
            size="xs"
            w="50%"
            mb="3"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </VStack>
        <Flex direction="row" justifyContent="space-evenly">
          <Button size="xs" onClick={handleSignUp} type="submit">
            Sign-Up
          </Button>
          <Button size="xs" onClick={handleLogIn} type="submit">
            Log In
          </Button>
        </Flex>
        <Flex justifyContent="center" direction="row" alignItems="center" mt="4">
          <Button size="xs" p="5" leftIcon=<GitHubLogo /> onClick={handleGitHubLogin} />
          <Button size="xs" p="5" leftIcon=<GoogleLogo /> onClick={handleGoogleLogin} />
        </Flex>
      </FormControl>
    </Flex>
  );
}
export default Login;