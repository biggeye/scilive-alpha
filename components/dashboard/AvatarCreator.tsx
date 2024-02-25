'use client'
import React, { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Select, Input, Box, Button, FormControl, FormLabel, Textarea, useToast, VStack, Image, Grid, GridItem, CircularProgress, Checkbox } from '@chakra-ui/react';
import { avatarNameState, avatarDescriptionState, avatarUrlState, frameStyleState, photoStyleState } from '@/state/createTalk-atoms';
import { useUserContext } from '@/lib/user/UserProvider';
import { imageArrayState } from '@/state/createTalk-atoms';
import { createClient } from '@/utils/supabase/client';

const AvatarCreator: React.FC = ({ onCompleted }) => {

  const supabase = createClient();

  const [avatarName, setAvatarName] = useRecoilState(avatarNameState);
  const [avatarDescription, setAvatarDescription] = useRecoilState(avatarDescriptionState);
  const [frameStyle, setFrameStyle] = useRecoilState(frameStyleState);
  const [photoStyle, setPhotoStyle] = useRecoilState(photoStyleState);
  const [avatarUrl, setAvatarUrl] = useRecoilState(avatarUrlState);

  const [isLoading, setIsLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const toast = useToast();

  const { userProfile } = useUserContext();
  const userId = userProfile.id;

  useEffect(() => {
    const subscription = supabase
      .channel('custom-insert-channel')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'master_content' }, (payload) => {
        console.log('Change received!', payload);
        if (payload.new && payload.new.url) {
          setImages(currentImages => {
            const updatedImages = [...currentImages, payload.new.url];
            // Assume loading is complete once an image is successfully received and added
            setIsLoading(false);
            return updatedImages;
          });
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
          frame_style: frameStyle,
          photo_style: photoStyle
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
        return
      } else if {
        console.log(responseData);
        onCompleted();
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
            <FormLabel>Avatar Name</FormLabel>
            <Input value={avatarName || ''} onChange={(e) => setAvatarName(e.target.value)} placeholder="Name your avatar" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Avatar Description</FormLabel>
            <Textarea value={avatarDescription || ''} onChange={(e) => setAvatarDescription(e.target.value)} placeholder="Describe your avatar" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Photo Style</FormLabel>
            <Select placeholder="Select option" onChange={(e) => setPhotoStyle(e.target.value)}>
              <option value="Photorealistic">Photorealistic</option>
              <option value="Semi-Illustrated">Semi-Illustrated</option>
              <option value="Illustration">Illustration</option>
              <option value="Manga Illustration">Manga Illustration</option>
              <option value="Pixar">Pixar</option>
              <option value="Minecraft">Minecraft</option>
              <option value="custom">Custom</option>
            </Select>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Frame Style</FormLabel>
            <Select placeholder="Select option" onChange={(e) => setFrameStyle(e.target.value)}>
              <option value="Minimal">Minimal</option>
              <option value="Matrix">Matrix</option>
              <option value="Digital">Digital</option>
              <option value="HUD">HUD</option>
              <option value="Aiming Reticle">Aiming Reticle</option>
              <option value="Tribal">Tribal</option>
              <option value="custom">Custom</option>
            </Select>
            </FormControl>
          <Button type="submit"  size="lg" width="full">
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
            
            isDisabled={selectedImageIndex === null}
            onClick={() => {
              if (selectedImageIndex !== null) {
                setAvatarUrl(images[selectedImageIndex]);
            
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

export default AvatarCreator;
