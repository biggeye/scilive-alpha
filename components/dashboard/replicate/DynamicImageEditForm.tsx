'use client';
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useImageEditSubmit } from '@/lib/replicate/useImageEditSubmit';
import { Box, InputGroup, Input, Button, FormControl, Alert, Grid, GridItem, InputRightAddon } from '@chakra-ui/react';
import { useUserContext } from '@/lib/UserProvider';
import { finalPredictionState, userImageDataUriState, userImagePreviewState, userImageUploadState, predictionIsLoadingState, predictionErrorState } from '@/state/prediction-atoms';
import { selectedModelIdState, selectedModelInputFieldsState } from '@/state/config-atoms';
import { useRecoilState, useRecoilValue } from 'recoil';
import { convertToDataURI } from '@/lib/convertToDataURI';

const ImageEditForm = () => {
  const { supabase, userProfile } = useUserContext();
  const userId = userProfile?.id;
  const selectedModelInputFields = useRecoilValue(selectedModelInputFieldsState);
  const [modelInputs, setModelInputs] = useState<string[]>([]);
  const [formInputs, setFormInputs] = useState<{ [key: string]: string }>({});
  const imageEditSubmit = useImageEditSubmit(supabase);
  const finalPrediction = useRecoilValue(finalPredictionState);
  const modelId = useRecoilValue(selectedModelIdState);
  const [predictionIsLoading, setPredictionIsLoading] = useRecoilState(predictionIsLoadingState);
  const predictionError = useRecoilValue(predictionErrorState);
  
  const [userImagePreview, setUserImagePreview] = useRecoilState(userImagePreviewState);
  const [userImageUpload, setUserImageUpload] = useRecoilState(userImageUploadState);
  const [userImageDataUri, setUserImageDataUri] = useRecoilState(userImageDataUriState);

  useEffect(() => {
    if (selectedModelInputFields) {
      const inputFields = selectedModelInputFields.split(",");
      setModelInputs(inputFields);
      setFormInputs(inputFields.reduce((acc, field) => ({ ...acc, [field]: '' }), {}));
    }
  }, [selectedModelInputFields]);

  const handleInputChange = (field: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setFormInputs({ ...formInputs, [field]: e.target.value });
  };

  const onImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      const imagePreview = URL.createObjectURL(file);
      setUserImageUpload(file);
      setUserImagePreview(imagePreview);
      const URI = await convertToDataURI(file);
      setUserImageDataUri(URI);
    }
  };

  const handleUserImageEditSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPredictionIsLoading(true);

    // Perform validation if necessary
    if (!modelId || !userId) {
      console.error("No model selected or user not found");
      return;
    }

    // Here you would construct your payload from formInputs and submit
    // For demonstration, we just log the formInputs
    console.log(formInputs);
    
    // Simulate API call
    await imageEditSubmit({...formInputs, image: userImageDataUri}); // Adapted for demonstration

    setPredictionIsLoading(false);
  };

  return (
    <Box>
      <FormControl>
        <form onSubmit={handleUserImageEditSubmit}>
          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            {modelInputs.map(inputName => (
              <GridItem key={inputName}>
                {inputName === 'image' ? (
                  <Input
                    padding=".5"
                    size="xs"
                    type="file"
                    accept="image/*"
                    onChange={onImageChange}
                    width="full"
                  />
                ) : (
                  <Input
                    placeholder={`Enter ${inputName}`}
                    value={formInputs[inputName]}
                    onChange={handleInputChange(inputName)}
                    disabled={predictionIsLoading}
                  />
                )}
              </GridItem>
            ))}
            <GridItem colSpan={2}>
              <Button
                type="submit"
                isLoading={predictionIsLoading}
                loadingText="Submitting"
              >
                Submit
              </Button>
            </GridItem>
          </Grid>
          {predictionError && <Alert>{predictionError}</Alert>}
        </form>
      </FormControl>
    </Box>
  );
}

export default ImageEditForm;
