// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Box, Button, FormControl, FormLabel, Textarea, useToast, VStack, Image, Grid, GridItem, CircularProgress, Checkbox } from '@chakra-ui/react';
import { avatarNameState, avatarDescriptionState, avatarUrlState } from '@/state/createTalk-atoms';
import { useUserContext } from '@/lib/user/UserProvider';
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

  const [isLoading, setIsLoading] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [polling, setPolling] = useState(false); // A state to trigger polling
  const [images, setImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const toast = useToast();

  const { userProfile } = useUserContext();
  const userId = userProfile.id;

  useEffect(() => {
    const subscription = supabase
      .channel('custom-insert-channel')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'master_content' }, (payload) => {
        console.log('Change received!', payload);
        if (payload.new && payload.new.url) {
          setImages(currentImages => [...currentImages, payload.new.url]);
        }
      })
      .subscribe();
    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
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
  
      } else {
        console.log(responseData);
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
          {isLoading ? (
            <CircularProgress isIndeterminate color="blue.300" />
          ) : (
            <Grid templateRows="repeat(2, 1fr)" templateColumns="repeat(2, 1fr)" gap={4}>
              {images.map((imgUrl, index) => (
                <GridItem key={index} colSpan={1}>
                  <Image src={imgUrl} alt={`Avatar Image ${index + 1}`} />
                  <Checkbox isChecked={selectedImageIndex === index} onChange={() => setSelectedImageIndex(index)} />
                </GridItem>
              ))}
            </Grid>
          )}
          <Button
            colorScheme="blue"
            isDisabled={selectedImageIndex === null}
            onClick={() => {
              if (selectedImageIndex !== null) {
                setAvatarUrl(images[selectedImageIndex]);
                onCompleted();
              }
            }}
          >
            Select Avatar
          </Button>


        </VStack>
      </form>
    </Box>
  );
};

export default CreateAvatar;
