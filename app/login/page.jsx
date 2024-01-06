"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client"; // Ensure this path is correct
import {
  Flex,
  VStack,
  InputGroup,
  Spacer,
  Button,
  FormControl,
  Input,
} from "@chakra-ui/react";

export default function LoginPage() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const GitHubLogo = () => (
    <svg viewBox="0 0 16 16" width="24" height="24" aria-hidden="true">
      <path
        fill-rule="evenodd"
        fill="currentColor"
        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2 0-.37-.38-.37-.38-.36-.91-.88-1.16-.88-1.16-.72-.49.05-.48.05-.48.8.06 1.22.82 1.22.82.71 1.21 1.87.86 2.33.66.07-.52.28-.86.5-1.06-1.6-.18-3.28-.8-3.28-3.56 0-.79.28-1.43.74-1.93-.07-.18-.32-.91.07-1.9 0 0 .6-.19 1.97.73.57-.16 1.18-.24 1.79-.24s1.22.08 1.79.24c1.37-.92 1.97-.73 1.97-.73.39.99.14 1.72.07 1.9.46.5.74 1.14.74 1.93 0 2.76-1.68 3.38-3.29 3.56.28.24.53.72.53 1.44 0 1.04-.01 1.88-.01 2.14 0 .21.15.46.55.38C13.71 14.53 16 11.54 16 8c0-4.42-3.58-8-8-8z"
      />
    </svg>
  );

  const GoogleLogo = () => (
    <svg
      viewBox="0 0 256 262"
      width="24"
      height="24"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid"
    >
      <path
        fill="#4285F4"
        d="M255.6 130.4c0-4.8-.4-9.5-1.3-14H131v52.6h70.2c-3 20.2-12.2 37.4-26 49.4l40.4 31.3c23.9-22.1 37.7-54.6 37.7-92.3z"
      />
      <path
        fill="#34A853"
        d="M130.9 261c35.3 0 64.9-11.7 86.5-31.6l-40.4-31.3c-11.7 7.9-26.6 12.5-42.2 12.5-32.4 0-59.9-21.9-69.7-51.4H18.2v32.2C39.2 228.3 82.7 261 130.9 261z"
      />
      <path
        fill="#FBBC05"
        d="M61.2 157.7c-2.6-7.7-4.1-16-4.1-24.7s1.5-17 4.1-24.7V76.1H18.2c-14.2 27.3-22.3 59.4-22.3 94.1s8.1 66.8 22.3 94.1l43-32.6z"
      />
      <path
        fill="#EA4335"
        d="M130.9 51.8c18.3 0 34.7 6.3 47.6 18.7l35.6-35.6C195.8 17.7 165.2 6 130.9 6 82.7 6 39.2 38.7 18.2 76.1l43 31.6c9.8-29.5 37.3-51.4 69.7-51.4z"
      />
    </svg>
  );

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth event:", event);
        console.log("Session:", session);
        if (session) {
          const expiresAt = new Date(session.expires_at * 1000);
          const { data, error } = await supabase.from("oauth2tokens").insert([
            {
              user_id: session.user.id,
              service: "supabase",
              access_token: session.access_token,
              token_type: session.token_type,
              refresh_token: session.refresh_token,
              expires_in: expiresAt,
              provider: session.user.app_metadata.provider,
            },
          ]);
          if (error) {
            console.error("Error inserting session data:", error.message);
          } else {
            console.log("Session data inserted:", data);
          }
          const avatarUrl = session.user.user_metadata?.avatar_url;
          if (avatarUrl) {
            const { error: updateError } = await supabase
              .from("users")
              .update({ avatar_url: avatarUrl })
              .eq("id", session.user.id);
            if (updateError) {
              console.error("Error updating user avatar:", updateError.message);
            } else {
              console.log("User avatar updated successfully");
            }
          }
        }
      }
    );
    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  const handleGitHubLogin = async () => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: "github",
      });
    } catch (error) {
      console.error("GitHub login error:", error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: "google",
      });
    } catch (error) {
      console.error("Google login error:", error.message);
    }
  };

  async function handleSignUp(event) {
    event.preventDefault(); // Prevent default form submission behavior

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_DEFAULT_URL}/dashboard`,
      },
    });

    if (error) {
      console.error("Signup error:", error.message);
    } else {
      console.log("Signup success:", data);
      router.push(`${process.env.NEXT_PUBLIC_DEFAULT_URL}/dashboard`);
    }
  }

  async function handleLogIn(event) {
    event.preventDefault(); // Prevent default form submission behavior

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.error("Login error:", error.message);
    } else {
      console.log("Login success:", data);
      router.push(`${process.env.NEXT_PUBLIC_DEFAULT_URL}/dashboard`);
    }
  }

  return (
    <Flex direction="column" alignItems="center">
      <FormControl>
        <VStack>
          <Input
            size="xs"
            w="50%"
            mt="3"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
          />
          <Input
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
          <Button size="xs" p="5" leftIcon={<GitHubLogo />} onClick={handleGitHubLogin} />
          <Button size="xs" p="5" leftIcon={<GoogleLogo />} onClick={handleGoogleLogin} />
        </Flex>
      </FormControl>
    </Flex>
  );
}
