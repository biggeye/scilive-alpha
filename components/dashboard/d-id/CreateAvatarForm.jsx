'use client'
import React, { useState } from 'react';

const CreateAvatarForm = () => {
  const [avatarScript, setAvatarScript] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [talkResponse, setTalkResponse] = useState(null);

  const handleCreateAvatar = async () => {
    setLoading(true);
    setError(null);
  
    try {
      const response = await fetch('/api/did/talk/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          
          source_url: sourceUrl,
          script: {
            input: avatarScript,
            type: 'text', 
        
          }
        })
      });     
  
      // ... rest of the code
    } catch (error) {
      setError('Failed to create avatar');
      setLoading(false);
    }
  };
  

  return (
    <div>
      <label>
        Avatar Script:
        <input type="text" value={avatarScript} onChange={(e) => setAvatarScript(e.target.value)} />
      </label>
      <br />
      <label>
        Source URL:
        <input type="text" value={sourceUrl} onChange={(e) => setSourceUrl(e.target.value)} />
      </label>
      <br />
      <button onClick={handleCreateAvatar} disabled={loading}>
        Create Avatar
      </button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {talkResponse && (
        <div>
          <p>Avatar creation successful!</p>
          <p>Talk Status: {talkResponse.talkStatus}</p>
          {/* Add more information from talkResponse as needed */}
        </div>
      )}
    </div>
  );
};

export default CreateAvatarForm;
