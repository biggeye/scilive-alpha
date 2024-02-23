"use client";

import { useState, useEffect } from 'react';

const FacebookTest = () => {
 
  const [userName, setUserName] = useState('');
  useEffect(() => {
    // Ensure FB SDK is loaded and initialized before calling FB.api
    if (typeof window !== 'undefined' && window.FB) {
      window.FB.getLoginStatus((response) => {
        if (response.status === 'connected') {
          window.FB.api('/me?fields=id,name', (response) => {
            // Set user's name from the API response
            setUserName(response.name);
          });
        } else {
          console.log('User not authenticated');
        }
      });
    }
  }, []);

  return (
    <div>
      {userName ? (
        <p>Welcome, {userName}</p>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
};

export default FacebookTest;
