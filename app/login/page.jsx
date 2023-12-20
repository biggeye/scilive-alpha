'use client'
import { useState } from 'react';
import { createClient } from "@/utils/supabase/client"; // Ensure this path is correct
import GitHubLoginButton from "@/components/auth/GitHubLoginButton";
import GoogleLoginButton from "@/components/auth/GoogleLoginButton";

export default function LoginPage() {
  const supabase = createClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
      console.error('Signup error:', error.message);
    } else {
      console.log('Signup success:', data);
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
      console.error('Login error:', error.message);
    } else {
      console.log('Login success:', data);
      // Redirect or handle successful login
    }
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <GitHubLoginButton />
        <GoogleLoginButton />
        <form>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="E-mail" 
          />
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Password" 
          />
          <button onClick={handleSignUp} type="submit">Sign Up</button>
          <button onClick={handleLogIn} type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
}
