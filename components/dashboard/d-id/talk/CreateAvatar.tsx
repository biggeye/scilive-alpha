// Import necessary dependencies
import React, { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Box, Button, FormControl, FormLabel, Textarea, useToast, VStack, Image } from '@chakra-ui/react';
import { avatarNameState, avatarDescriptionState, avatarUrlState } from '@/state/createTalk-atoms';
import uploadPrediction from '@/lib/replicate/uploadPrediction';
import { randomUUID } from 'crypto';
import { useUserContext } from '@/lib/UserProvider';

interface CreateAvatarProps {
  onCompleted: () => void;
}

const CreateAvatar: React.FC<CreateAvatarProps> = ({ onCompleted }) => {
  const avatarName = useRecoilValue(avatarNameState);
  const [avatarDescription, setAvatarDescription] = useRecoilState(avatarDescriptionState);
  const [avatarUrl, setAvatarUrl] = useRecoilState(avatarUrlState);
  const [images, setImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const toast = useToast();
  const modelId = "leapPrediction"
  const predictionId = `leapPrediction-${randomUUID}`;
  const { userProfile } = useUserContext();
  const userId = userProfile.id;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_DEFAULT_URL}/api/leap/out/create-avatar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          avatar_name: avatarName,
          avatar_description: avatarDescription,
          user_id: userId,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`);
      }
  
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.indexOf('application/json') !== -1) {
        const data = await response.json();
        if (data && data.output) {
          const imageUrls = Object.keys(data.output).map(key => data.output[key]);
          setImages(imageUrls);
        } else {
          console.error('No output data from the workflow run');
          toast({
            title: 'Error',
            description: 'No output data from the workflow run',
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
        }
      } else {
        throw new Error('Received non-JSON response from server');
      }
    } catch (error) {
      console.error('Error running the workflow', error);
      toast({
        title: 'Error',
        description: 'Error running the workflow',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };
  

  const handleImageSelect = async (imageUrl: string) => {
    setSelectedImage(imageUrl);
    try {
      const supabaseUpload = await uploadPrediction(imageUrl, userId, modelId, predictionId, avatarDescription);
      setAvatarUrl(supabaseUpload);
      onCompleted();
    } catch (error) {
      console.error('Error uploading image to Supabase', error);
      toast({
        title: 'Error',
        description: 'Error uploading image to Supabase',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };
  

  const renderImages = () => (
    <VStack>
      {images.map((imageUrl, index) => (
        <Box key={index} p={2} borderWidth="1px" borderRadius="lg" overflow="hidden">
          <Image src={imageUrl} alt={`Avatar ${index + 1}`} onClick={() => handleImageSelect(imageUrl)} cursor="pointer" />
        </Box>
      ))}
    </VStack>
  );

  return (
    <Box maxW="md" mx="auto" mt={5}>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} p={5}>
          <FormControl isRequired>
            <FormLabel>Avatar Description</FormLabel>
            <Textarea value={avatarDescription || ''} onChange={(e) => setAvatarDescription(e.target.value)} placeholder="Describe your avatar" />
          </FormControl>
          <Button type="submit" colorScheme="blue" size="lg" width="full">
            Submit
          </Button>
          {images.length > 0 && renderImages()}
        </VStack>
      </form>
    </Box>
  );
};

export default CreateAvatar;
