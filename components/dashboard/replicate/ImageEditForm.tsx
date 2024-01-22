'use client';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useImageEditSubmit } from '@/lib/replicate/useImageEditSubmit';
import { Box, Card, InputGroup, Input, Button, FormControl, Alert, Grid, GridItem, InputRightAddon } from '@chakra-ui/react';
import { useUserContext } from '@/lib/UserProvider';
import { predictionStatusState, userImageDataUriState, userImagePreviewState, userImageUploadState, predictionIsLoadingState, predictionErrorState } from '@/state/prediction-atoms';
import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedModelIdState } from '@/state/config-atoms';

const convertToDataURI = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result ? reader.result.toString() : '');
    reader.onerror = (error) => reject(error);
  });

const ImageEditForm = () => {
  const { supabase, userProfile } = useUserContext();
  const userId = userProfile?.id;

  const [userInput, setUserInput] = useState<string>('');
  const imageEditSubmit = useImageEditSubmit(supabase);

  const modelId = useRecoilValue(selectedModelIdState);
  const predictionIsLoading = useRecoilValue(predictionIsLoadingState);
  const predictionError = useRecoilValue(predictionErrorState);
  const predictionStatus = useRecoilValue(predictionStatusState);

  const [userImagePreview, setUserImagePreview] = useRecoilState(userImagePreviewState);
  const [userImageUpload, setUserImageUpload] = useRecoilState(userImageUploadState);
  const [userImageDataUri, setUserImageDataUri] = useRecoilState(userImageDataUriState);

  const handleTextInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const onImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      const imagePreview = URL.createObjectURL(file);
      setUserImagePreview(imagePreview);
      const URI = await convertToDataURI(file);
      setUserImageDataUri(URI); // Use the new state setter here
    }
  };

  const handleUserImageEditSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!modelId || !userId) {
      console.error("No model selected or user not found");
      return;
    }
    await imageEditSubmit(userInput);
  };

  return (
    <Box>
    <FormControl>
      <form onSubmit={handleUserImageEditSubmit}>
        <Grid templateRows="2">
          <GridItem>
            <Input
              padding=".5"
              size="xs"
              className="dynamic-input-upload"
              type="file"
              accept="image/*"
              onChange={onImageChange}
              width="50%"
            />
          </GridItem>
          <InputGroup>
            <Input
            
              placeholder="Enter text for image creation"
              aria-label="Text for image creation"
              value={userInput}
              disabled={predictionIsLoading}
              onChange={handleTextInputChange}
            />
            <InputRightAddon>
              <Button
              
                type="submit"
                disabled={predictionIsLoading}
              >
            Submit
              </Button>
            </InputRightAddon>
          </InputGroup>


          </Grid>
        {predictionError && <Alert>{predictionError}</Alert>}
      </form>
    </FormControl>
    </Box>
  );
}

export default ImageEditForm;