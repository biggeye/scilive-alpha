'use client';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useImageCreateSubmit } from '@/lib/replicate/useImageCreateSubmit';
import {
  Input, InputGroup, Alert, FormControl, InputRightAddon, HStack, Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, useDisclosure,
  Image, Grid, GridItem, Text, IconButton
} from '@chakra-ui/react';
import { useUserContext } from '@/lib/user/UserProvider';
import { finalPredictionState, userImageDataUriState, userImagePreviewState, userImageUploadState, predictionIsLoadingState, predictionErrorState } from '@/state/replicate/prediction-atoms';
import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedModelIdState } from '@/state/replicate/config-atoms';
import { convertToDataURI } from '@/lib/convertToDataURI';
import ProgressIndicator from '@/components/utils/CircularProgress';
import {
  FileUpload,
  FileUploadTrigger,
  FileUploadDropzone,
} from '@saas-ui/file-upload'
import { createClient } from '@/utils/supabase/client';
import { useEffect } from 'react';
import { ViewIcon } from '@saas-ui/react';

interface GalleryItem {
  id: string; // Adjust types according to your actual data structure
  url: string;
  name: string;
}



const ImageEditForm = () => {
  const imageEditSubmit = useImageCreateSubmit();
  const supabase = createClient();
  const { userProfile } = useUserContext();
  const userId = userProfile?.id;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userInput, setUserInput] = useState<string>('');

  const finalPrediction = useRecoilValue(finalPredictionState);
  const modelId = useRecoilValue(selectedModelIdState);
  const predictionError = useRecoilValue(predictionErrorState);

  const [predictionIsLoading, setPredictionIsLoading] = useRecoilState(predictionIsLoadingState);
  const [userImagePreview, setUserImagePreview] = useRecoilState(userImagePreviewState);
  const [userImageUpload, setUserImageUpload] = useRecoilState(userImageUploadState);
  const [userImageDataUri, setUserImageDataUri] = useRecoilState(userImageDataUriState);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);

  useEffect(() => {
    const fetchGalleryItems = async () => {
      const { data, error } = await supabase
        .from('master_content')
        .select('*')
        .eq('created_by', userProfile?.id);

      if (error) {
        console.error('Error fetching gallery items:', error);
      } else {
        setGalleryItems(data || []);
      }
    };

    if (userProfile?.id) {
      fetchGalleryItems();
    }
  }, [userProfile?.id]);


  const handleTextInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      const file = event.target.files[0];
      const imagePreview = URL.createObjectURL(file);
      setUserImageUpload(file);
      setUserImagePreview(imagePreview);
      const URI = await convertToDataURI(file);
      setUserImageDataUri(URI);
    }
  };

  const handleGallerySelection = async (imageUrl: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const file = new File([blob], "filename", { type: blob.type });
      const imagePreview = URL.createObjectURL(file);
      setUserImageUpload(file);
      setUserImagePreview(imagePreview);
      const URI = await convertToDataURI(file);
      setUserImageDataUri(URI);
    } catch (error) {
      console.error("Error fetching and processing image from URL:", error);
    }
  };

  const handleUserImageEditSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPredictionIsLoading(true);

    if (!modelId || !userId) {
      console.error("No model selected or user not found");
      return;
    }
    await imageEditSubmit(userInput);

    if (finalPrediction) {
      setPredictionIsLoading(false);
      setUserImageUpload(null);
      setUserImagePreview(null);
    }

  };

  return (
    <Box>

      <Button onClick={onOpen} leftIcon={<ViewIcon />} colorScheme="teal" size="sm">
        Open Gallery
      </Button>
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Your Gallery</DrawerHeader>
          <DrawerBody>
            <Grid templateColumns="repeat(3, 1fr)" gap={4}>
              {galleryItems.map((item) => (
                <GridItem key={item.id} cursor="pointer" onClick={() => handleGallerySelection(item.url)}>
                  <Image src={item.url} alt={item.name} boxSize="100px" objectFit="cover" />
                  <Text fontSize="sm" mt={2}>{item.name}</Text>
                </GridItem>
              ))}
            </Grid>

          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <FormControl>
        <form onSubmit={handleUserImageEditSubmit}>
          <Grid templateRows="2">
            <GridItem>
              <FileUpload

                /* Remove `getRootNode` in your code, only required for this example */
                maxFileSize={10000 * 10000}
                maxFiles={1}
                accept="image/*"
                onChange={handleFileChange}
              >
                {({ files, deleteFile }) => (
                  <FileUploadDropzone>
                    <Text fontSize="sm">Drag your image here</Text>
                    {!files?.length ? (
                      <FileUploadTrigger as={Button}>Select files</FileUploadTrigger>
                    ) : (
                      <HStack>
                        <Text fontSize="sm">{files[0].name}</Text>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteFile(files[0])
                          }}
                        >
                          Clear
                        </Button>
                      </HStack>
                    )}
                  </FileUploadDropzone>
                )}
              </FileUpload>
            </GridItem>
            <InputGroup size={{ base: "sm", md: "md" }}>
              <Input
                fontSize={{ base: "sm", md: "md" }}
                placeholder="Enter text for image creation"
                aria-label="Text for image creation"
                value={userInput}
                disabled={predictionIsLoading}
                onChange={handleTextInputChange}
              />
              <InputRightAddon>
                <Button
                  size="sm"
                  fontSize={{ base: "sm", md: "md" }}
                  type="submit"
                  disabled={predictionIsLoading}
                >
                  Submit
                </Button>
              </InputRightAddon>
            </InputGroup>


          </Grid>
          {predictionError && <Alert fontSize={{ base: "sm", md: "md" }}>{predictionError}</Alert>}
        </form>
      </FormControl>
    </Box>
  );
}

export default ImageEditForm;