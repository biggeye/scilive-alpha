"use client";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  streamIdState,
  sessionIdState,
  sdpOfferState,
  iceServersState,
} from "@/state/d_id_stream-atoms";

export const createNewStream = async (avatar_url) => {
  const [streamId, setStreamId] = useRecoilState(streamIdState);
  const [sessionId, setSessionId] = useRecoilState(sessionIdState);
  const [sdpOffer, setSdpOffer] = useRecoilState(sdpOfferState);
  const [iceServers, setIceServers] = useRecoilState([iceServersState]);

  const sessionResponse = await fetchWithRetries(
    `https://api.d-id.com/talks/streams`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic {YOUR_DID_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source_url: `${avatar_url}`,
      }),
    }
  );

  /*  EXAMPLE RESPONSE:
  {
  "id": "your_stream_id",
  "session_id": "your_session_id",
  "offer": "your_sdp_offer",
  "ice_servers": [
    {
      "urls": ["stun:stun.example.com"]
    }
  ]
}
   */

  setStreamId(sessionResponse.id);
  setSessionId(sessionResponse.session_id);
  setSdpOffer(sessionResponse.offer);
  setIceServers(sessionResponse.ice_servers?.urls[0]);
};
