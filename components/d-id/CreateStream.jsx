import React, { useState } from 'react';

const CreateStreamComponent = () => {
  const [sourceUrl, setSourceUrl] = useState('');
  const [streamId, setStreamId] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [offer, setOffer] = useState(null);
  const [iceServers, setIceServers] = useState([]);

  const createStream = async () => {
    try {
      const response = await fetch('https://api.d-id.com/talks/streams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ source_url: sourceUrl }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setStreamId(data.id);
      setSessionId(data.session_id);
      setOffer(data.offer);
      setIceServers(data.ice_servers);
      // Handle other UI updates or navigation here
    } catch (error) {
      console.error('Error creating stream:', error);
      // Handle error in UI here
    }
  };

  return (
    <div>
      <input type="text" value={sourceUrl} onChange={(e) => setSourceUrl(e.target.value)} />
      <button onClick={createStream}>Create Stream</button>
      {streamId && <p>Stream Created: {streamId}</p>}
      {/* Display other data or UI elements as needed */}
    </div>
  );
};

export default CreateStreamComponent;
