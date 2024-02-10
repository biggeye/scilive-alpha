import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { Button, FormControl, FormLabel, Input, Box, Alert, useToast, useBoolean } from '@chakra-ui/react';
import { avatarImageState } from '@/state/d-id/d_id_talk-atoms';
import { uploadFileToBucket } from '@/lib/d-id/uploadAvatar'; // Ensure this path is correct

interface CreateAvatarProps {
  onCompleted: () => void;
}

const CreateAvatar: React.FC<CreateAvatarProps> = ({ onCompleted }) => {
  const [isLoading, setIsLoading] = useBoolean(false);
  const [error, setError] = useState("");
  const [userInFile, setUserInFile] = useState<File | null>(null);
  const [avatarImage, setAvatarImage] = useRecoilState(avatarImageState);
  const toast = useToast();

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fileUrl = URL.createObjectURL(file);
      setUserInFile(file); // Store the file in state
      setAvatarImage(fileUrl); // Update the avatarImage state with the file URL for preview
    }
  };

  const handleAvatarUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInFile) {
      toast({
        title: 'No file selected.',
        description: 'Please select an image file to upload.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setIsLoading.on();
    try {
      const sourceUrl = await uploadFileToBucket(userInFile);
      if (!sourceUrl) throw new Error('File upload failed, URL is undefined.');
      toast({
        title: 'Avatar Uploaded Successfully.',
        description: `File uploaded to: ${sourceUrl}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setAvatarImage(sourceUrl); // Assuming you want to update the avatarImage state with the returned URL
    } catch (uploadError) {
      setError("An error occurred during file upload.");
      toast({
        title: 'Error uploading file.',
        description: error,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading.off();
    }
  };

  return (
    <Box as="form" onSubmit={handleAvatarUpload}>
      {error && <Alert status="error" mb={4}>{error}</Alert>}
      <FormControl isRequired>
        <FormLabel>Upload Avatar Image</FormLabel>
        <Input type="file" accept="image/*" onChange={onImageChange} disabled={isLoading} />
      </FormControl>
      <Button mt={4} isLoading={isLoading} type="submit">
        Upload Avatar
      </Button>
    </Box>
  );
};

export default CreateAvatar;
