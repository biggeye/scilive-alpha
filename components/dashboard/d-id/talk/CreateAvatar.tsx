import React, { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Box, FormControl, FormLabel, Input, Textarea, Button, useToast, VStack, Card, Heading } from '@chakra-ui/react';
import { avatarNameState, avatarDescriptionState, avatarUrlState } from '@/state/createTalk-atoms';
import { Leap } from "@leap-ai/workflows";

interface CreateAvatarProps {
  onCompleted: () => void;
}

const CreateAvatar: React.FC<CreateAvatarProps> = ({ onCompleted }) => {
  const avatarName = useRecoilValue(avatarNameState);
  const [avatarDescription, setAvatarDescription] = useRecoilState(avatarDescriptionState);
  const [avatarUrl, setAvatarUrl] = useRecoilState(avatarUrlState);
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await fetch("https://api.workflows.tryleap.ai/v1/runs", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_LEAP_API_KEY || ''}`, // Ensures the value is a string
        },
        
        body: JSON.stringify({
          workflow_id: "wkf_fENKVAhNzDo2cq", // Unique ID of the workflow you want to run
          webhook_url: `${process.env.NEXT_PUBLIC_DEFAULT_URL}/api/leap/run`, // Optional
          inputs: {
            avatar_name: avatarName,
            avatar_description: avatarDescription,
          }
        }),
      });
      const data = await response.json(); // Assuming the response is JSON
      if (data && data.output) {
        setAvatarUrl(JSON.stringify(data.output));
      } else {
        console.error('No output data from the workflow run');
      }
    } catch (error) {
      console.error('Error running the workflow', error);
    }
  
    toast({
      title: 'Avatar Created',
      description: 'The avatar has been successfully created.',
      status: 'success',
      duration: 5000,
      isClosable: true,
      position: 'top',
    });
  
    onCompleted();
  };
  
  return (
    <Box maxW="md" mx="auto" mt={5}>
      <Card>
        <VStack spacing={4} as="form" onSubmit={handleSubmit} p={5} boxShadow="xl" rounded="md" bg="white">
          <Heading as="h3" size="lg" textAlign="center">
            Create Avatar
          </Heading>
           <FormControl isRequired>
            <FormLabel>Avatar Description</FormLabel>
            <Textarea value={avatarDescription || ''} onChange={(e) => setAvatarDescription(e.target.value)} placeholder="Describe your avatar" />
          </FormControl>
          <Button type="submit" colorScheme="blue" size="lg" width="full">
            Submit
          </Button>
        </VStack>
      </Card>
    </Box>
  );
};

export default CreateAvatar;
