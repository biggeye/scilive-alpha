'use client'
import { selectPeers, useHMSStore } from "@100mslive/react-sdk";
import React from "react";
import Peer from "./Peer";

import { Box, Heading } from "@chakra-ui/react";

function Conference() {
  const peers = useHMSStore(selectPeers);
  return (
    <Box className="conference-section" p="20px 30px" maxW="960px" m="0 auto">
    <Heading as="h2" size="lg" textAlign="center" pb={2} borderBottom="1px solid #546e7a">
      Conference
    </Heading>
        {peers.map((peer) => (
          <Peer key={peer.id} peer={peer} />
        ))}
      </Box>
  );
}

export default Conference;
