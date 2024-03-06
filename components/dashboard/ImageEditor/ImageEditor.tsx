'use client';
import React, { useState, ChangeEvent, FormEvent, useCallback, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useUserContext } from '@/lib/user/UserProvider';
import { useImageCreateSubmit } from '@/lib/replicate/useImageCreateSubmit';
import { handleGalleryEditSelection } from '@/lib/replicate/handleGalleryEditSelection';
import { convertToDataURI } from '@/utils/convertToDataURI';

// import UI
import {
  Alert, Input, InputGroup, InputRightAddon, FormControl, HStack, Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, useDisclosure,
  Image, Grid, GridItem, Text
} from '@chakra-ui/react';
import {
  FileUpload,
  FileUploadTrigger,
  FileUploadDropzone,
} from '@saas-ui/file-upload';
import { Form, FormLayout, ViewIcon, ContextMenuList, ContextMenuItem, ContextMenu, ContextMenuTrigger } from '@saas-ui/react';

// import STATE
import { useRecoilState, useRecoilValue } from 'recoil';
import { finalPredictionState, userImageDataUriState, userImagePreviewState, userImageUploadState, predictionErrorState, globalLoadingState } from '@/state/replicate/prediction-atoms';
import { selectedModelIdState } from '@/state/replicate/config-atoms';
import { currentUserAvatarUrlState } from '@/state/user/user_state-atoms';
import { currentPageState } from '@/state/user/user_state-atoms';

// import TYPES
import { GalleryItem } from '@/types';

const ImageEditor = () => {
  const supabase = createClient();
  const { userProfile } = useUserContext();
  const userId = userProfile.id;

  const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
  useEffect(() => {
    setCurrentPage("editImage");
  }, [currentPage]);

  const imageEditSubmit = useImageCreateSubmit();

  // read Global State
  const finalPrediction = useRecoilValue(finalPredictionState);
  const modelId = useRecoilValue(selectedModelIdState);
  const predictionError = useRecoilValue(predictionErrorState);
  const globalLoading = useRecoilValue(globalLoadingState);

  // Gallery State and Fetching
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [currentUserAvatarUrl, setCurrentUserAvatarUrl] = useRecoilState(currentUserAvatarUrlState);
  const onEdit = useCallback(async (imageUrl: string) => {

    useEffect(() => {
      const fetchGalleryItems = async () => {
        const { data, error } = await supabase
          .from('master_content')
          .select('*')
          .eq('created_by', userProfile?.id);
        if (error) {
          console.error('Error fetching gallery items:', error);
        } else if (data) {
          const galleryItems: GalleryItem[] = data.map(item => ({
            content_id: item.id,
            url: item.url,
            name: item.name,
          }));
          setGalleryItems(galleryItems);
        }
      };
      if (userProfile?.id) {
        fetchGalleryItems();
      }
    }, []);

    const result = await handleGalleryEditSelection(imageUrl);
    if (result) {
      setUserImageUpload(result.file);
      setUserImagePreview(result.imagePreview);
      setUserImageDataUri(result.URI);
    }
  }, []);

  const onDelete = async (content_id: string) => {
      try {
        const { error } = await supabase
          .from('master_content')
          .delete()
          .eq('content_id', content_id);

      } catch (error) {
        console.error("Error deleting content:", error);
      }
    };

/*
  const onSetProfile = async (url: string) => {
    setCurrentUserAvatarUrl(url);
    await supabase.from('users').update({ avatar_url: url }).eq({ id: userId });
  };

  const handleImageClick = (itemIndex: number) => {
    setCurrentIndex(itemIndex);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
*/


  // User Input State
  const [userInput, setUserInput] = useState<string>('');
  const [userImagePreview, setUserImagePreview] = useRecoilState(userImagePreviewState);
  const [userImageUpload, setUserImageUpload] = useRecoilState(userImageUploadState);
  const [userImageDataUri, setUserImageDataUri] = useRecoilState(userImageDataUriState);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setUserInput(e.target.value);
  const handleUserImageEditSubmit = async () => {
    if (!modelId || !userId) {
      console.error("No model selected or user not found");
      return;
    }
    await imageEditSubmit(userInput);
    if (finalPrediction) {
      setUserImageUpload(null);
      setUserImagePreview(null);
    }
  };

  return (
    <Box>
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Your Gallery</DrawerHeader>
          <DrawerBody>
            <Grid templateColumns="repeat(3, 1fr)" gap={4}>
              {galleryItems.map((item) => (
                <ContextMenu key={item.content_id}>
                  <ContextMenuTrigger>
                    <GridItem cursor="pointer">
                      <Image src={item.url} alt={item.name} boxSize="75px" objectFit="cover" />
                      <Text fontSize="sm" mt={2}>{item.name}</Text>
                    </GridItem>
                  </ContextMenuTrigger>
                  <ContextMenuList>
                    <ContextMenuItem onClick={() => onEdit(item.url)}>Edit</ContextMenuItem>
                    <ContextMenuItem onClick={() => onDelete(item.content_id)}>Delete</ContextMenuItem>

                  </ContextMenuList>
                </ContextMenu>
              ))}


            </Grid>


          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Form onSubmit={handleUserImageEditSubmit}>
        <FormLayout>

          <FileUpload
            maxFileSize={10000 * 10000}
            maxFiles={1}
            accept="image/*"
            onChange={handleFileChange}
          >
            {({ files, deleteFile }) => (
              <FileUploadDropzone
              >
                <Text fontSize="sm"></Text>
                {!files?.length ? (
                  <FileUploadTrigger color="teal" as={Button}>Drag image here or click to browse</FileUploadTrigger>
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
          <Button onClick={onOpen} leftIcon={<ViewIcon />} colorScheme="teal" size="sm">
            open gallery
          </Button>
          <InputGroup>
            <Input
              value={userInput}
              onChange={handleInputChange}
            />
            <InputRightAddon>
              <Button
                type="submit">
                Edit Image
              </Button>
            </InputRightAddon>
          </InputGroup>
        </FormLayout>
      </Form>
      {predictionError && <Alert fontSize={{ base: "sm", md: "md" }}>{predictionError}</Alert>}
    </Box >

  )
}

export default ImageEditor;