import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { Box, FormControl, FormLabel, Input, Textarea, Button, useToast, Alert } from '@chakra-ui/react';
import { avatarNameState, avatarDescriptionState } from '@/state/videoState'; // Ensure these paths and state atoms are correctly defined

interface CreateAvatarProps {
  onCompleted: () => void;
}

const CreateAvatar: React.FC<CreateAvatarProps> = ({ onCompleted }) => {
  const [avatarName, setAvatarName] = useRecoilState(avatarNameState);
  const [avatarDescription, setAvatarDescription] = useRecoilState(avatarDescriptionState);
  const [error, setError] = useState('');
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you might want to validate input or handle the submission logic
    toast({
      title: 'Avatar Details Updated',
      description: 'Avatar name and description have been successfully updated.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    onCompleted();
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      {error && <Alert status="error" mb={4}>{error}</Alert>}
      <FormControl isRequired>
        <FormLabel>Avatar Name</FormLabel>
        <Input type="text" value={avatarName} onChange={(e) => setAvatarName(e.target.value)} placeholder="Enter avatar name" />
      </FormControl>
      <FormControl isRequired mt={4}>
        <FormLabel>Avatar Description</FormLabel>
        <Textarea value={avatarDescription} onChange={(e) => setAvatarDescription(e.target.value)} placeholder="Enter avatar description" />
      </FormControl>
      <Button mt={4} type="submit">
        Update Avatar
      </Button>
    </Box>
  );
};

export default CreateAvatar;
