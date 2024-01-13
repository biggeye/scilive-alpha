'use client'
import { useRecoilValue } from "recoil";
import { sessionIdState } from "@/state/d_id_stream-atoms";

export const createTalkStream = () => {
  const sessionId = useRecoilValue(sessionIdState);

  const options = {
    method: "POST",
    headers: { accept: "application/json", "content-type": "application/json" },
    body: JSON.stringify({
      script: {
        type: "audio",
        subtitles: "false",
        provider: { type: "microsoft", voice_id: "en-US-JennyNeural" },
        ssml: "false",
        audio_url: "https://url.to.audio.stream",
      },
      config: { fluent: "false", pad_audio: "0.0" },
      session_id: sessionId,
      result_url: "result_url",
    }),
  };

  fetch("https://api.d-id.com/talks/streams/stream_identifier", options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
};
