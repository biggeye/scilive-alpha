'use client';
import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { talkVideoPendingUrlState, talkVideoStatusState, talkVideoUrlState } from '@/state/d_id_talk';

const CreateVideoTalkForm = () => {
  const [avatarScript, setAvatarScript] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [talkResponse, setTalkResponse] = useState(null); // Added state for talkResponse
  const [talkVideoUrl, setTalkVideoUrl] = useRecoilState(talkVideoUrlState);
  const [talkVideoPendingUrl, setTalkVideoPendingUrl] = useRecoilState(talkVideoPendingUrlState);
  const [talkVideoStatus, setTalkVideoStatus] = useRecoilState(talkVideoStatusState);

  useEffect(() => {
    let intervalId;
    const pollStatus = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_DEFAULT_URL}/api/did/talk/status/${talkResponse.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch talk status');
        }
        const responseData = await response.json();
         setTalkVideoStatus(response.status);
        if (responseData.status === 'complete') {
          setTalkVideoPendingUrl(null);
          setTalkVideoUrl(responseData.result_url);
          setLoading(false);
        } else if (responseData.status === 'error' && responseData.pending_url) {
          setTalkVideoPendingUrl(responseData.pending_url);
          setLoading(false);
        } else {
          // Continue polling if status is neither complete nor error
          setTimeout(pollStatus, 1000); // Poll every 1 second (adjust as needed)
        }
      } catch (error) {
        console.error('Error while polling status:', error);
        setError('Error while polling status');
        setLoading(false);
      }
    };

    if (talkResponse && talkResponse.status !== 'complete' && !talkVideoPendingUrl) {
      intervalId = setTimeout(pollStatus, 1000); // Assign intervalId
    }

    return () => clearTimeout(intervalId); // Clear the interval on unmount
  }, [talkResponse, talkVideoPendingUrl]);

  const handleCreateAvatar = async () => {
    setLoading(true);
    setError(null);

    try { 
      const response = await fetch(`${process.env.NEXT_PUBLIC_DEFAULT_URL}/api/did/talk/create`, {
       method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          avatar_script: avatarScript,
          source_url: sourceUrl,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create avatar');
      }

      const responseData = await response.json();
      setTalkResponse(responseData); // Assuming responseData has the structure for talkResponse
    } catch (error) {
      console.error('Error while creating avatar:', error);
      setError(error.message);
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
          <p>Avatar creation in progress...</p>
          {pendingUrl && <p>Pending URL: {pendingUrl}</p>}
        </div>
      )}
    </div>
  );
};

export default CreateVideoTalkForm;
