"use client";

export async function createPeerConnection(sdpOffer, iceServers, setSessionClientAnswer, streamId, sessionId) {
  const peerConnection = new RTCPeerConnection({ iceServers });

  // Setup event listeners
  peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      const { candidate, sdpMid, sdpMLineIndex } = event.candidate;

      fetch(`https://api.d-id.com/talks/streams/${streamId}/ice`, {
        method: "POST",
        headers: {
          Authorization: `Basic ${process.env.NEXT_PUBLIC_DID_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          candidate,
          sdpMid,
          sdpMLineIndex,
          session_id: sessionId,
        }),
      }).catch(error => console.error("Failed to send ICE candidate:", error));
    }
  };

  // Proceed with setting remote description and creating an answer
  await peerConnection.setRemoteDescription(new RTCSessionDescription(sdpOffer));
  const sessionAnswer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(sessionAnswer);

  setSessionClientAnswer(sessionAnswer);
}
 