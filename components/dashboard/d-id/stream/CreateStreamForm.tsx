'use client'
import { InputLeftAddon, 
  Grid, 
  GridItem, 
  Card, 
  CardHeader, 
  CardBody, 
  CardFooter, 
  FormControl, 
  InputGroup, 
  Input, 
  InputRightAddon, 
  Button, 
  Alert, 
  Text, 
  Center, 
  Box } from "@chakra-ui/react";
import StreamStatus from "./StreamStatus";
import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
// Import your state atoms
import { streamIdState, sessionIdState, sdpOfferState, iceServersState, sessionClientAnswerState } from '@/state/d_id_stream-atoms';
// Import utility functions
import { createStream, createPeerConnection, getSdpReply, createTalkStream } from '@/lib/d-id'; // Adjust imports based on your file structure

export default function StreamComponent() {
    // State managed by Recoil for global use
    const [streamId, setStreamId] = useRecoilState(streamIdState);
    const [sessionId, setSessionId] = useRecoilState(sessionIdState);
    const [sdpOffer, setSdpOffer] = useRecoilState(sdpOfferState);
    const [iceServers, setIceServers] = useRecoilState(iceServersState);
    const [sessionClientAnswer, setSessionClientAnswer] = useRecoilState(sessionClientAnswerState);

    // Local component state for UI interactions
    const [avatarUrl, setAvatarUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Function to initiate the stream creation process
    const handleCreateStream = async () => {
        setIsLoading(true);
        setError('');
        try {
            await createStream(avatarUrl, setStreamId, setSessionId, setSdpOffer, setIceServers);
            // Continue the process with creating a peer connection, etc.
            const answer = await createPeerConnection(sdpOffer, iceServers, setSessionClientAnswer);
            // Handle the answer, possibly send it back to the server or use it to establish the connection
        } catch (err) {
            console.error('Failed to create stream:', err);
            setError('Failed to create stream. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Effect hook to react to changes in state, for example, to finalize the connection setup
    useEffect(() => {
        if (streamId && sessionId && sessionClientAnswer) {
            // Example: Finalize the setup or log that the stream is ready
            console.log('Stream setup is complete.');
        }
    }, [streamId, sessionId, sessionClientAnswer]);

  return (
    <>
      <FormControl>
        <Grid templateRows="2">
          <form onSubmit={handleAvatarUpload}>
            <GridItem>
              <InputGroup>
                <InputLeftAddon>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Processing..." : "Upload"}
                  </Button>
                </InputLeftAddon>
                <Input
                  padding=".5"
                  size="xs"
                  className="dynamic-input-upload"
                  type="file"
                  accept="image/*"
                  onChange={onImageChange}
                  width="30%"
                />
                <Input
                  size="xs"
                  type="text"
                  onChange={onAvatarNameChange}
                  width="70%"
                />
              </InputGroup>
            </GridItem>
          </form>
          <form onSubmit={handleAvatarSubmit}>
            <InputGroup>
              <Input
                size="sm"
                placeholder="Enter avatar's script"
                aria-label="Text for image creation"
                value={avatarInput}
                disabled={isLoading}
                onChange={handleInputChange}
              />
              <InputRightAddon> <Button type="submit" disabled={isLoading} size="sm">
                {isLoading ? "Processing..." : "Start Stream"}
              </Button></InputRightAddon>
            </InputGroup>
          </form>
          {error && <Alert>{error}</Alert>}
        </Grid>
      </FormControl>
      <StreamStatus />
    </>
  )
}