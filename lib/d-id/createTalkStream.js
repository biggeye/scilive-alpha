'use client'

export const createTalkStream = (script, streamId, sessionId) => {
   const options = {
    method: "POST",
    headers: { accept: "application/json", "content-type": "application/json" },
    body: JSON.stringify({
      script: {
        type: "audio",
        subtitles: "false",
        provider: { type: "microsoft", voice_id: "en-US-JennyNeural" },
        ssml: "false",
        audio_url: audioUrl,
        input: {
          script: script,
        }
      },
      config: { fluent: "false", pad_audio: "0.0" },
      session_id: sessionId,
      result_url: "result_url",
    }),
  };

  fetch(`https://api.d-id.com/talks/streams/${streamId}`, options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
};
