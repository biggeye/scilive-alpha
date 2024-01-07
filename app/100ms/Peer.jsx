import { useVideo } from "@100mslive/react-sdk";
import { Box, Text } from "@chakra-ui/react";

function Peer({ peer }) {
  const { videoRef } = useVideo({
    trackId: peer.videoTrack
  });

  return (
    <Box className="peer-container" p={2}>
      <video
        ref={videoRef}
        className={`peer-video ${peer.isLocal ? "local" : ""}`}
        autoPlay
        muted
        playsInline
        style={{
          height: "250px",
          width: "250px",
          borderRadius: "40%",
          objectFit: "cover",
          marginBottom: "10px",
          transform: peer.isLocal ? "scaleX(-1)" : "none"
        }}
      />
      <Text textAlign="center" fontSize="14px">
        {peer.name} {peer.isLocal ? "(You)" : ""}
      </Text>
    </Box>
  );
}

export default Peer;