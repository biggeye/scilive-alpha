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
const data = await sessionResponse.json();
setStreamId(data.id);
setSessionId(data.session_id);
setSdpOffer(data.offer);
setIceServers(data.ice_servers?.urls[0]); // Assuming ice_servers is an array and you're interested in the first URL.

};
