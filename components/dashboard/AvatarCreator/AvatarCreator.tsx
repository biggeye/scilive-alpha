'use client'
import React, { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { CardBody, Heading, CardHeader, Card, Select, Input, Box, Button, FormControl, FormLabel, Textarea, useToast, VStack, Image, Grid, GridItem, CircularProgress, Checkbox } from '@chakra-ui/react';
import { avatarNameState, avatarDescriptionState, avatarUrlState, frameStyleState, photoStyleState } from '@/state/leap/avatar-atoms';
import { useUserContext } from '@/lib/user/UserProvider';
import { createClient } from '@/utils/supabase/client';
import {
  Form,
  FormLayout,
  Field,
  DisplayIf,
  SubmitButton,
} from '@saas-ui/react'

const AvatarCreator: React.FC = () => {

  const supabase = createClient();

  const [avatarName, setAvatarName] = useRecoilState(avatarNameState);
  const [avatarDescription, setAvatarDescription] = useRecoilState(avatarDescriptionState);
  const [frameStyle, setFrameStyle] = useRecoilState(frameStyleState);
  const [photoStyle, setPhotoStyle] = useRecoilState(photoStyleState);
  const [avatarUrl, setAvatarUrl] = useRecoilState(avatarUrlState);

  const [isLoading, setIsLoading] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [images, setImages] = useState<string[]>([]);

  const toast = useToast();

  const { userProfile } = useUserContext();
  const userId = userProfile.id;

  useEffect(() => {
    const subscription = supabase
      .channel('custom-insert-channel')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'master_content' }, (payload: any) => {
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
    <Grid templateAreas={`"topCard"
                       "bottomCard"`}
      gridTemplateRows="2">
      <GridItem area="topCard">
        <Card
          className="image-card"
          borderColor="onyx"
          borderWidth="0.5px"
          p={{ base: "1", md: "2", lg: "4" }}
          maxW="lg">
          <CardHeader
             align="center" 
             justify="space-between">
              <Heading>
                Avatar Creator
              </Heading>
            </CardHeader>
          <CardBody>
            <Form
               onSubmit={handleSubmit}>
              <FormLayout spacing={4} display="flex" flexDirection="column" alignItems="center" mb={4}>
                Avatar Name
                <Input value={avatarName || ''} onChange={(e) => setAvatarName(e.target.value)} placeholder="Name your avatar" />
                Avatar Description
                <Textarea value={avatarDescription || ''} onChange={(e) => setAvatarDescription(e.target.value)} placeholder="Describe your avatar" />
                Photo Style
                <Select placeholder="Select option" onChange={(e) => setPhotoStyle(e.target.value)}>
                  <option value="Photorealistic">Photorealistic</option>
                  <option value="Semi-Illustrated">Semi-Illustrated</option>
                  <option value="Illustration">Illustration</option>
                  <option value="Manga Illustration">Manga Illustration</option>
                  <option value="Pixar">Pixar</option>
                  <option value="Minecraft">Minecraft</option>
                  <option value="custom">Custom</option>
                </Select>
                Frame Style
                <Select placeholder="Select option" onChange={(e) => setFrameStyle(e.target.value)}>
                  <option value="Minimal">Minimal</option>
                  <option value="Matrix">Matrix</option>
                  <option value="Digital">Digital</option>
                  <option value="HUD">HUD</option>
                  <option value="Aiming Reticle">Aiming Reticle</option>
                  <option value="Tribal">Tribal</option>
                  <option value="custom">Custom</option>
                </Select>
                <Button type="submit" size="lg" width="full">
                  Submit
                </Button>
              </FormLayout>
            </Form>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem area="bottomCard">
        <Card
          className="featured-image-card">
          {isLoading ? (

            <CircularProgress isIndeterminate color="blue.300" />
          ) : (
            <Grid templateRows="repeat(2, 1fr)" templateColumns="repeat(2, 1fr)" gap={4}>
              {images.map((imgUrl, index) => (
                <GridItem key={index} colSpan={1}>
                  <Image src={imgUrl} alt={`Avatar Image ${index + 1}`} boxSize="100px" objectFit="cover" />
                  <Checkbox isChecked={selectedImageIndex === index} onChange={() => setSelectedImageIndex(index)} />
                </GridItem>
              ))}
            </Grid>
          )}
          <Button
            mt={4}
       
            isDisabled={selectedImageIndex === null}
            onClick={() => {
              if (selectedImageIndex !== null) {
                setAvatarUrl(images[selectedImageIndex]);
              }
            }}
          >
            Select Avatar
          </Button>
        </Card>
      </GridItem>
    </Grid>

  );
};

export default AvatarCreator;