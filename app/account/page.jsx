"use client"

import { createClient } from "@/utils/supabase/client";
import React, { useState } from "react";
import {  } from "@/lib/supabase.js";

const Account = () => {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  
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

export default Account;