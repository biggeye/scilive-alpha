"use client";

export const createStream = async (avatar_url, setStreamId, setSessionId, setSdpOffer, setIceServers) => {
  const sessionResponse = await fetch(`https://api.d-id.com/talks/streams`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${process.env.NEXT_PUBLIC_DID_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ source_url: `${avatar_url}` }),
  });

  // Handle the response
  setStreamId(sessionResponse.id);
  setSessionId(sessionResponse.session_id);
  setSdpOffer(sessionResponse.offer);
  setIceServers(sessionResponse.ice_servers?.urls[0]);
};
