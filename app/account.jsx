// /app/login/page.tsx
"use client";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import { AccountIcon } from "./icons";

export default function Account() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");



  const signInWithPassword = async (event) => {
    event.preventDefault();
    setLoading(true);

    const { user, session, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) setMessage(error.message);
    else setMessage("Login successful!");

    setLoading(false);
  };

  const handleOAuthLogin = async (provider) => {
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
          redirectTo: `${default_url}/api/auth/callback`,
        },
      });

      if (error) {
        setMessage(error.message);
      }
      // The page will redirect on successful login
    } catch (error) {
      setMessage("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form">
      <form onSubmit={signInWithPassword} className="auth-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          Login
        </button>
      </form>
      <button onClick={() => handleOAuthLogin("google")} disabled={loading}>
        Login with Google
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}
