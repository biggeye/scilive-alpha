'use client'

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client'; // Import your configured Supabase client
import { getSessionServer } from '@/lib/supabase-server';

const NewOauthLogin = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  
  const supabase = createClient();
  const userId = supabase.auth.getUser();
  const session = getSessionServer();


 const handleSubmit = async (e) => {
    e.preventDefault();

    const profileData = {
      user_id: userId,
      first_name: firstName,
      last_name: lastName,
      email: email,
    };

    // Insert data into Supabase - adjust table and column names as per your schema
    const { data, error } = await supabase
      .from('profiles')
      .insert([{ profileData }]);

    if (error) {
      console.error('Error inserting data:', error);
      return;
    }

    // Redirect to another page upon successful submission
    window.location.href = '/dashboard';
  };

  return (
    session
      ? <p>Welcome {userId}, proceed to <a href="/dashboard">dashboard</a>.</p>
      : <form onSubmit={handleSubmit}>
          <code>{userId}</code>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            required
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <button type="submit">Submit</button>
        </form>
  );
};

export default NewOauthLogin;
