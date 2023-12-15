'use client'

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client'; // Import your configured Supabase client

const NewOauthLogin = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  
  const supabase = createClient();
 
  
 const handleSubmit = async (e) => {
    e.preventDefault();
    // Insert data into Supabase - adjust table and column names as per your schema
    const { data, error } = await supabase
      .from('profiles')
      .insert([{ user_id: userId, first_name: firstName, last_name: lastName, email: email }]);

    if (error) {
      console.error('Error inserting data:', error);
      return;
    }

    // Redirect to another page upon successful submission
    window.location.href = '/dashboard';
  };

  return (
    <form onSubmit={handleSubmit}>
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
