"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client"; // Ensure this path is correct
import GitHubLoginButton from "@/components/auth/oauth2/GitHubLoginButton";
import GoogleLoginButton from "@/components/auth/oauth2/GoogleLoginButton";
import TikAPILoginButton from "@/components/auth/oauth2/TikAPILoginButton";

export default function LoginPage() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tikTokLogin, setTikTokLogin] = useState(null);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth event:', event);
        console.log('Session:', session);
  
        if (session) {
          // Insert session data into oauth2tokens table
          const { data, error } = await supabase
            .from('oauth2tokens')
            .insert([
              { 
                user_id: session.user.id, 
                service: 'supabase',
                access_token: session.access_token,
                token_type: 'Bearer',
                expires_in: new Date(session.expires_at),
              },
            ]);
  
          if (error) {
            console.error("Error inserting session data:", error.message);
          } else {
            console.log("Session data inserted:", data);
          }
        }
      }
    );
  
    // Cleanup the listener when the component is unmounted.
    return () => {
      authListener;
    };
  }, []);
  

  async function handleSignUp(event) {
    event.preventDefault(); // Prevent default form submission behavior

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: "https://scilive.cloud/dashboard",
      },
    });

    if (error) {
      console.error("Signup error:", error.message);
    } else {
      console.log("Signup success:", data);
      // Redirect or handle successful signup
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
      // Redirect or handle successful login
    }
  }
  

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="login-buttons">

          <GitHubLoginButton />
          <GoogleLoginButton />
        </div>
         <form className="flex flex-col">
          <input
          className="signin-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
          />
          <input
          className="signin-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <div className="signin-buttons">
          <button
            className="submit-button"
            onClick={handleSignUp}
            type="submit"
          >
            Sign Up
          </button>
          <button className="submit-button" onClick={handleLogIn} type="submit">
            Log In
          </button>
          </div>
        </form>
      </div>
 
  );
}
