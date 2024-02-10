// Use client-side environment variable handling for Next.js
"use client";

export const createStream = async (avatarUrl, setStreamId, setSessionId, setSdpOffer, setIceServers) => {
  const sessionResponse = await fetch(`https://api.d-id.com/talks/streams`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${process.env.NEXT_PUBLIC_DID_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ source_url: avatarUrl }),
  });

  const data = await sessionResponse.json();
  setStreamId(data.id);
  setSessionId(data.session_id);
  setSdpOffer(data.offer);
  setIceServers(data.ice_servers); // Store the entire ICE servers array
};

export async function getSdpReply(sessionId, streamId, sessionClientAnswer) {
  const response = await fetch(`https://api.d-id.com/talks/streams/${streamId}/sdp`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${process.env.NEXT_PUBLIC_DID_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      answer: sessionClientAnswer, // Assuming sessionClientAnswer is correctly structured
      session_id: sessionId,
    }),
  });

  const data = await response.json();
  return data; // Return the response for handling elsewhere
}

// Example usage in the onicecandidate event handler
peerConnection.onicecandidate = event => {
  if (event.candidate) {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: `Bearer YOUR_AUTH_TOKEN` // Use the correct token
      },
      body: JSON.stringify({
        candidate: event.candidate.candidate,
        sdpMid: event.candidate.sdpMid,
        sdpMLineIndex: event.candidate.sdpMLineIndex,
        session_id: sessionId // Use the correct session ID
      })
    };

    fetch(`https://api.d-id.com/talks/streams/${streamId}/ice`, options)
      .then(response => response.json())
      .then(data => console.log("ICE candidate sent successfully:", data))
      .catch(err => console.error("Error sending ICE candidate:", err));
  }
};
