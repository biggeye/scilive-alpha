'use client';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useImageCreateSubmit } from '@/lib/replicate/useImageCreateSubmit';
import { CircularProgress, Box, Card, InputGroup, Input, Button, FormControl, Alert, Grid, GridItem, InputRightAddon } from '@chakra-ui/react';
import { useUserContext } from '@/lib/UserProvider';
import { finalPredictionState, userImageDataUriState, userImagePreviewState, userImageUploadState, predictionIsLoadingState, predictionErrorState } from '@/state/prediction-atoms';
import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedModelIdState } from '@/state/config-atoms';
import { convertToDataURI } from '@/lib/convertToDataURI';
import ProgressIndicator from '@/components/CircularProgress';

const ImageEditForm = () => {
  const { userProfile } = useUserContext();
  const userId = userProfile?.id;

  const [userInput, setUserInput] = useState<string>('');
  const imageEditSubmit = useImageCreateSubmit();
  const finalPrediction = useRecoilValue(finalPredictionState);
  const modelId = useRecoilValue(selectedModelIdState);
  const [predictionIsLoading, setPredictionIsLoading] = useRecoilState(predictionIsLoadingState);
  const predictionError = useRecoilValue(predictionErrorState);

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
      setUserImageUpload(file);
      setUserImagePreview(imagePreview);
      const URI = await convertToDataURI(file);
      setUserImageDataUri(URI); // Use the new state setter here
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
     }
   
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