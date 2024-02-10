import React, { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Button, Box, Alert, useToast } from '@chakra-ui/react';
import { avatarScriptState, avatarImageState, voiceIdState, talkVideoUrlState } from '@/state/d-id/d_id_talk-atoms';

const CreateVideoTalkForm = () => {
  const avatarScript = useRecoilValue(avatarScriptState);
  const avatarImage = useRecoilValue(avatarImageState);
  const voiceId = useRecoilValue(voiceIdState);
  const setTalkVideoUrl = useSetRecoilState(talkVideoUrlState);

  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const submitTalkProduction = async () => {
    setIsLoading(true);

    const payload = {
      avatarScript,
      uploadedFileUrl: avatarImage,
      voiceId
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_DEFAULT_URL}/api/did/talk/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Assuming an authorization token is needed. Adjust as necessary.
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Failed to create talk production');
      const responseData = await response.json();
      setTalkVideoUrl(responseData.videoUrl); // Assuming the response contains a videoUrl field
      toast({
        title: 'Talk production created successfully.',
        description: 'The talk production video is now available.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error creating talk production.',
        description: 'An unknown error occurred',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box>
      {avatarImage && (
        <video width="750" controls>
          <source src={avatarImage} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      <Button
        mt={4}
        isLoading={isLoading}
        loadingText="Processing..."
        colorScheme="teal"
        onClick={submitTalkProduction}
      >
        Create Talk Production
      </Button>
    </Box>
  );
};

export default CreateVideoTalkForm;
