'use client'
import { useAVToggle } from "@100mslive/react-sdk";
import { Flex, Button } from "@chakra-ui/react";

function Footer() {
  const {
    isLocalAudioEnabled,
    isLocalVideoEnabled,
    toggleAudio,
    toggleVideo
  } = useAVToggle();
  return (
    <Flex className="control-bar" position="fixed" bottom={0} w="full" p={4} justifyContent="center">
      <Button className="btn-control" onClick={toggleAudio}>
        {isLocalAudioEnabled ? "Mute" : "Unmute"}
      </Button>
      <Button className="btn-control" onClick={toggleVideo}>
        {isLocalVideoEnabled ? "Hide" : "Unhide"}
      </Button>
    </Flex>
  );
}

export default Footer;
