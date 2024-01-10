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
                    <Th>Parameter</Th>
                    <Th>Status</Th>
                </Tr>
            </Thead>
            <Tbody>
                <Tr>
                    <Td>Stream ID</Td>
                    <Td>{statusCircle(streamId)}</Td>
                </Tr>
                <Tr>
                    <Td>Session ID</Td>
                    <Td>{statusCircle(sessionId)}</Td>
                </Tr>
                <Tr>
                    <Td>SDP Offer</Td>
                    <Td>{statusCircle(sdpOffer)}</Td>
                </Tr>
                <Tr>
                    <Td>ICE Servers</Td>
                    <Td>{statusCircle(iceServers)}</Td>
                </Tr>
                <Tr>
                    <Td>Session Client Answer</Td>
                    <Td>{statusCircle(sessionClientAnswer)}</Td>
                </Tr>
                <Tr>
                    <Td>Candidate</Td>
                    <Td>{statusCircle(candidate)}</Td>
                </Tr>
                <Tr>
                    <Td>sdpMid</Td>
                    <Td>{statusCircle(sdpMid)}</Td>
                </Tr>
                <Tr>
                    <Td>sdpMLineIndex</Td>
                    <Td>{statusCircle(sdpMLineIndex)}</Td>
                </Tr>
            </Tbody>
        </Table>
    );
}

export default StreamStatus;
