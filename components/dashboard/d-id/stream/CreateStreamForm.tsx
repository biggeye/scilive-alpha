'use client';
import React, { useState } from 'react';
import {
  Grid,
  GridItem,
  FormControl,
  InputGroup,
  Input,
  Button,
  Alert,
  useToast
} from '@chakra-ui/react';
import StreamStatus from './StreamStatus';
import { useRecoilState } from 'recoil';
import {
  streamIdState,
  sessionIdState,
  sdpOfferState,
  iceServersState,
  sessionClientAnswerState
} from '@/state/d-id/d_id_stream-atoms';
import { createStream, getSdpReply} from '@/lib/d-id/createStream';
import { createPeerConnection } from '@/lib/d-id/createPeerConnection';
import { createTalkStream } from '@/lib/d-id/createTalkStream';



export default function StreamComponent() {
  const [streamId, setStreamId] = useRecoilState(streamIdState);
  const [sessionId, setSessionId] = useRecoilState(sessionIdState);
  const [sdpOffer, setSdpOffer] = useRecoilState(sdpOfferState);
  const [iceServers, setIceServers] = useRecoilState(iceServersState);
  const [sessionClientAnswer, setSessionClientAnswer] = useRecoilState(sessionClientAnswerState);

  const [avatarUrl, setAvatarUrl] = useState('');
  const [script, setScript] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  // Handle file upload (assuming it's for avatar image)
  const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      // Assuming you have a method to handle the image upload and get back an URL
      const uploadedAvatarUrl = URL.createObjectURL(event.target.files[0]);
      setAvatarUrl(uploadedAvatarUrl);
    }
  };

  // Combines steps to create and start a stream into one process
  const handleCreateAndStartStream = async () => {
    setIsLoading(true);
    try {
      // Create Stream
      await createStream(avatarUrl, setStreamId, setSessionId, setSdpOffer, setIceServers);
      // Assuming createPeerConnection handles creating the answer and updating the necessary state
      await createPeerConnection(sdpOffer, iceServers, setSessionClientAnswer);
      // Additional steps like creating talk stream can be initiated here
      await createTalkStream(script, streamId, sessionId); // Adjust parameters as needed
      toast({
        title: 'Stream created successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error creating stream:', error);
      toast({
        title: 'Error creating stream.',
        description: `${error}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <FormControl>
        <Grid templateRows="repeat(2, 1fr)" gap={4}>
          <GridItem>
            <InputGroup>
              <Input
                pr="4.5rem"
                type="file"
                accept="image/*"
                onChange={onImageChange}
                placeholder="Upload Avatar"
              />
              <Input
                value={script}
                onChange={(e) => setScript(e.target.value)}
                placeholder="Enter script for avatar"
              />
              <Button
                onClick={handleCreateAndStartStream}
                isLoading={isLoading}
                loadingText="Creating..."
                colorScheme="teal"
                variant="outline"
              >
                Start Stream
              </Button>
            </InputGroup>
          </GridItem>
        </Grid>
      </FormControl>
      {streamId && <StreamStatus />}
    </>
  );
}
