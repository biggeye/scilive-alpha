import { useRecoilState, useRecoilValue } from "recoil";
import { sessionClientAnswerState, sdpOfferState, iceServersState } from "@/state/d_id_stream-atoms";




export async function createPeerConnection() {
  const sdpOffer = useRecoilValue(sdpOfferState);
const iceServers = useRecoilValue(iceServersState);

const [sessionClientAnswer, setSessionClientAnswer] = useRecoilState(sessionClientAnswerState);

if (!peerConnection) {
      peerConnection = new RTCPeerConnection({ iceServers });

      peerConnection.addEventListener('icegatheringstatechange', onIceGatheringStateChange, true);
      peerConnection.addEventListener('icecandidate', onIceCandidate, true);
      peerConnection.addEventListener('iceconnectionstatechange', onIceConnectionStateChange, true);
      peerConnection.addEventListener('connectionstatechange', onConnectionStateChange, true);
      peerConnection.addEventListener('signalingstatechange', onSignalingStateChange, true);
      peerConnection.addEventListener('track', onTrack, true);
    }

    await peerConnection.setRemoteDescription(sdpOffer);
    const sessionAnswer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(sessionAnswer);

    setSessionClientAnswer(sessionAnswer);

    return sessionClientAnswer;
  }

    // SUBMIT NETWORK INFORMATION
    function onIceCandidate(event) {
        if (event.candidate) {
          const { candidate, sdpMid, sdpMLineIndex } = event.candidate;

          fetch(`https://api.d-id.com/talks/streams/${streamId}/ice`, {
            method: 'POST',
            headers: {
              Authorization: `Basic ${env.process.NEXT_PUBLIC_DID_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              candidate,
              sdpMid,
              sdpMLineIndex,
              session_id: sessionId,
            }),
          });
        }
      }