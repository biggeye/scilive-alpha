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
      const response = await fetch("https://api.workflows.tryleap.ai/v1/runs", {
        method: 'POST',
        headers: {
          'X-Api-Key': `Bearer ${process.env.NEXT_PUBLIC_LEAP_API_KEY || ''}`,
        },
        body: JSON.stringify({
          workflow_id: "wkf_fENKVAhNzDo2cq",
          webhook_url: "https://scilive.cloud/api/leap/run",
          input: {
            avatar_name: avatarName,
            avatar_description: avatarDescription,
            user_id: userId,
          }
        }),
      });
      // Inside the handleSubmit function after receiving the response
      const data = await response.json();
      if (data && data.output) {
        // Assuming 'output' is an object with keys like output[0], output[1], etc., containing image URLs
        const imageUrls = Object.keys(data.output).map(key => data.output[key]);
        setImages(imageUrls);
      } else {
        console.error('No output data from the workflow run');
      }

    } catch (error) {
      console.error('Error running the workflow', error);
    }
  };

  const handleImageSelect = async (imageUrl: string) => {
    setSelectedImage(imageUrl);
    const supabaseUpload = await uploadPrediction(selectedImage, userId, modelId, predictionId, prompt);
    setAvatarUrl(supabaseUpload);
    onCompleted();
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
