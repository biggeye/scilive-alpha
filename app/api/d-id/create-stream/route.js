export async function POST({ request }) {
const { id, session_id, offer, ice_servers } = request.body;

const peerConnection = new RTCPeerConnection({
    iceServers: [{ urls: ice_servers }]
  });
  
  await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));

  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);
  
}