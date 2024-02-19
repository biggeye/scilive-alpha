// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Grid, GridItem, Box, Button, FormControl, FormLabel, Textarea, useToast, VStack, Image } from '@chakra-ui/react';
import { avatarNameState, avatarDescriptionState, avatarUrlState } from '@/state/createTalk-atoms';
import { useUserContext } from '@/lib/UserProvider';
import { imageArrayState } from '@/state/createTalk-atoms';
import { createClient } from '@/utils/supabase/client';

interface CreateAvatarProps {
  onCompleted: () => void;
}

const CreateAvatar: React.FC<CreateAvatarProps> = ({ onCompleted }) => {
  const supabase = createClient();

  const imageArray = useRecoilValue(imageArrayState);
  const avatarName = useRecoilValue(avatarNameState);
  const [avatarDescription, setAvatarDescription] = useRecoilState(avatarDescriptionState);
  const [avatarUrl, setAvatarUrl] = useRecoilState(avatarUrlState);

  const [polling, setPolling] = useState(false); // A state to trigger polling
  const [images, setImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const toast = useToast();

  const { userProfile } = useUserContext();
  const userId = userProfile.id;

  useEffect(() => {
    // Subscribe to insert events on the master_content table
    // Subscribe to insert events on the master_content table
    const subscription = supabase
      .channel('custom-insert-channel')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'master_content' }, (payload) => {
        console.log('Change received!', payload);
        // Access the URL column of the new row data
        if (payload.new && payload.new.url) {
          setImages(currentImages => [...currentImages, payload.new.url]);
        }
      })
      .subscribe();


    // Cleanup subscription on component unmount
    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPolling(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_DEFAULT_URL}/api/leap/avatar`, {
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
        throw new Error(`Error: ${response.status}`);
      }

      const responseData = await response.json();
      if (responseData.status === "running") {
        toast({
          title: 'Processing',
          description: 'Your avatar creation has started. You will be notified upon completion.',
          status: 'info',
          duration: 9000,
          isClosable: true,
        });
        // Since the process is asynchronous and handled via webhook, trigger onCompleted to indicate the start
        onCompleted();
      } else {
        // If the workflow somehow completes immediately, handle accordingly
        console.log(responseData);
        // Perform actions with the responseData if needed
      }
    } catch (error) {
      console.error('Error running the workflow', error);
      toast({
        title: 'Error',
        description: `Error running the workflow: ${error}`,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };


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
          <Grid h='auto' templateRows='repeat(2, 1fr)' templateColumns='repeat(2, 1fr)' gap={4}>
  {images.map((imgUrl, index) => (
    <GridItem key={index} colSpan={1} bg='tomato'>
      <Image src={imgUrl} alt={`Avatar Image ${index + 1}`} objectFit="cover" />
    </GridItem>
  ))}
</Grid>

        </VStack>
      </form>
    </Box>
  );
};

export default CreateAvatar;
