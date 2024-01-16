'use client';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useImageEditSubmit } from '@/lib/replicate/useImageEditSubmit';
import { Card, InputGroup, Input, Button, FormControl, Alert, Flex, Spacer, InputLeftAddon, InputRightAddon, Grid, GridItem } from '@chakra-ui/react';
import { useUserContext } from '@/lib/UserProvider';
import { userImageUploadState } from '@/state/prediction-atoms';
import { atom, useRecoilState, useRecoilValue } from 'recoil';
import { selectedModelIdState } from '@/state/selected_model-atoms';

const ImageEditForm: React.FC = () => {
  const { supabase } = useUserContext();
  const { userProfile } = useUserContext();
  const userId = userProfile.id;
  const [userInput, setUserInput] = useState<string>("");
  const [userInFile, setUserInFile] = useState<File | null>(null);
  const [userImageUpload, setUserImageUpload] = useRecoilState(userImageUploadState);
  const { isLoading, error, handleImageEditSubmit } = useImageEditSubmit(supabase);
  const modelId = useRecoilValue(selectedModelIdState);

  const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUserInFile(e.target.files[0]);
      setUserImageUpload(e.target.files[0]);
    }
  };

  const handleUserImageEditSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!modelId || !userId) {
      console.error("No model selected or user not found");
      return;
    }
    await handleImageEditSubmit(userInput, modelId, userId);
  };

  return (
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

              size="sm"

              placeholder="Enter text for image creation"
              aria-label="Text for image creation"
              value={userInput}
              disabled={isLoading}
              onChange={handleTextInputChange}

            />

            <InputRightAddon>
              <Button
                size="sm"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Submit"}
              </Button>
            </InputRightAddon>
          </InputGroup>


        </Grid>
        {error && <Alert>{error}</Alert>}
      </form>
    </FormControl>
  );
};

export default ImageEditForm;
