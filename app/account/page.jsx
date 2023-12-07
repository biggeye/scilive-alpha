"use client"

import React, { useState } from "react";
import { signInWithPassword, handleOAuthLogin } from "@/lib/supabase.js";

const Account = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSignInWithPassword = async (signInWithPassword, event) => {
    setLoading(true);
    setMessage('');

    try {
      const result = await signInWithPassword(event);
      if (result && result.error) {
        setMessage(result.error);
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignInWithGoogle = async (handleOAuthLogin) => {
    setLoading(true);
    setMessage('');

    try {
      const result = await signInWithPassword("google");
      if (result && result.error) {
        setMessage(result.error);
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form">
      <form onSubmit={handleSignInWithPassword} className="auth-form">
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
      <button onClick={() => handleSignInWithGoogle("google")}>
        Login with Google
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Account;