'use client'
import { useRecoilValue } from "recoil";
import {
    streamIdState,
    sessionIdState,
    sdpOfferState,
    iceServersState,
    sessionClientAnswerState,
    candidateState,
    sdpMidState,
    sdpMLineIndexState
} from "@/state/d_id_stream-atoms";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Circle
} from "@chakra-ui/react";

import { IceServer, IceServers, StreamId, SessionId, SdpOffer, SessionClientAnswer, Candidate, SdpMid, SdpMLineIndex } from "@/types_db";

function StreamStatus() {
    const streamId = useRecoilValue(streamIdState);
    const sessionId = useRecoilValue(sessionIdState);
    const sdpOffer = useRecoilValue(sdpOfferState);
    const iceServers = useRecoilValue(iceServersState);
    const sessionClientAnswer = useRecoilValue(sessionClientAnswerState);
    const candidate = useRecoilValue(candidateState);
    const sdpMid = useRecoilValue(sdpMidState);
    const sdpMLineIndex = useRecoilValue(sdpMLineIndexState);

    const statusCircle = (value: 
        StreamId | 
        SessionId | 
        SdpOffer | 
        IceServers | 
        SessionClientAnswer | 
        Candidate | 
        SdpMid | 
        SdpMLineIndex | null): JSX.Element => {
        return <Circle size="10px" bg={value ? "green.500" : "red.500"} />;
    };

    return (
    import { Table, Thead, Tr, Td, Tooltip } from '@chakra-ui/react';

// Your Table Component
const StatusTable = () => {
  return (
    <Table size="xs" variant="simple">
      <Thead>
        <Tr>
          <Tooltip label="Stream ID" placement="top">
            <Td>{statusCircle(streamId)}</Td>
          </Tooltip>
          <Tooltip label="Session ID" placement="top">
            <Td>{statusCircle(sessionId)}</Td>
          </Tooltip>
          <Tooltip label="SDP Offer" placement="top">
            <Td>{statusCircle(sdpOffer)}</Td>
          </Tooltip>
          <Tooltip label="ICE Servers" placement="top">
            <Td>{statusCircle(iceServers)}</Td>
          </Tooltip>
          <Tooltip label="Session Client Answer" placement="top">
            <Td>{statusCircle(sessionClientAnswer)}</Td>
          </Tooltip>
          <Tooltip label="Candidate" placement="top">
            <Td>{statusCircle(candidate)}</Td>
          </Tooltip>
          <Tooltip label="sdpMid" placement="top">
            <Td>{statusCircle(sdpMid)}</Td>
          </Tooltip>
          <Tooltip label="sdpMLineIndex" placement="top">
            <Td>{statusCircle(sdpMLineIndex)}</Td>
          </Tooltip>
        </Tr>
      </Thead>
    </Table>
  );
}
    );
}

export default StreamStatus;
