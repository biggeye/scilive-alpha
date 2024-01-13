'use client'
import { useRecoilState, useRecoilValue } from "recoil";
import {
  streamIdState,
  sessionClientAnswerState,
  sessionIdState,
  sdpResponseState,
} from "@/state/d_id_stream-atoms";

export async function getSdpReply() {
  const sessionId = useRecoilValue(sessionIdState);
  const streamId = useRecoilValue(streamIdState);
  const sessionClientAnswer = useRecoilValue(sessionClientAnswerState);

  const [sdpResponse, setSdpResponse] = useRecoilState(sdpResponseState);

  const sdp = await fetch(
    `https://api.d-id.com/talks/streams/${streamId}/sdp`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${env.process.NEXT_PUBLIC_DID_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        answer: sessionClientAnswer,
        session_id: sessionId,
      }),
    }
  );
  setSdpResponse(sdp);
}
