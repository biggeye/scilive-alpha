'use client';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useImageEditSubmit } from '@/lib/replicate/useImageEditSubmit';
import { InputGroup, Input, Button, FormControl, Alert } from '@chakra-ui/react';
import { useUserContext } from '@/lib/UserProvider';
import { createClient } from '@/utils/supabase/client';

interface ImageEditFormProps {
  modelId: string;
  supabase: any;
  userId: string;  
}

const ImageEditForm: React.FC<ImageEditFormProps> = ({ modelId }) => {
  const { userProfile } = useUserContext();
  const userId = userProfile.id;
  const [userInput, setUserInput] = useState<string>("");
  const [userInFile, setUserInFile] = useState<File | null>(null);
  const supabase = createClient();
  const { isLoading, error, handleImageEditSubmit } = useImageEditSubmit(supabase);

  const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUserInFile(e.target.files[0]);
    }
  };

    const handleUserImageEditSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!modelId || !userId) {
      console.error("No model selected or user not found");
      return;
    }
    await handleImageEditSubmit(userInput, userInFile, modelId, userId);
  };

  return (
    <FormControl>
    <form onSubmit={handleUserImageEditSubmit}>
      <InputGroup>
     <Input
     width="auto"
     placeholder="Enter text for image creation"
     aria-label="Text for image creation"
     value={userInput}
     disabled={isLoading}
     onChange={handleTextInputChange}
   />
      <Input
        className="dynamic-input-upload"
        type="file"
        accept="image/*"
        onChange={onImageChange}
      />
      <Button
        type="submit"
        disabled={isLoading}
        className="submit-button"
      >
        {isLoading ? "Processing..." : "Submit"}
      </Button>
      </InputGroup>
      {error && <Alert>{error}</Alert>}
    </form>
    </FormControl>
  );
};

export default ImageEditForm;
