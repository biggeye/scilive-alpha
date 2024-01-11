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
      <Table size="xs" variant="simple">
    <Thead>
        <Tr>
            <Th>Stream</Th>
            <Th>Session</Th>
            <Th>Offer</Th>
            <Th>ICE</Th>
            <Th>SCA</Th>
            <Th>Candidate</Th>
            <Th>sdpMid</Th>
            <Th>sdpMLI</Th>
        </Tr>
    </Thead>
    <Tbody>
        <Tr>
            <Td>{statusCircle(streamId)}</Td>
            <Td>{statusCircle(sessionId)}</Td>
            <Td>{statusCircle(sdpOffer)}</Td>
            <Td>{statusCircle(iceServers)}</Td>
            <Td>{statusCircle(sessionClientAnswer)}</Td>
            <Td>{statusCircle(candidate)}</Td>
            <Td>{statusCircle(sdpMid)}</Td>
            <Td>{statusCircle(sdpMLineIndex)}</Td>
        </Tr>
    </Tbody>
</Table>
    );
}

export default StreamStatus;
