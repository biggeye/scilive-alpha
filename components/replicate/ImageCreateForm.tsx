'use client';
import React, { useState, FormEvent, ChangeEvent } from "react";
import { SupabaseClient } from '@supabase/supabase-js';
import { useImageCreateSubmit } from "@/lib/replicate/useImageCreateSubmit";
import { Input, InputGroup, Alert, Button } from "@chakra-ui/react";
import { useUserContext } from "@/lib/UserProvider";



// TypeScript interface for props
interface ImageCreateFormProps {
  modelId: string;
  supabase: SupabaseClient;
  userId: string;
}

const ImageCreateForm: React.FC<ImageCreateFormProps> = ({ modelId, supabase }) => {
 const { userProfile } = useUserContext();
  const userId = userProfile.id;
  console.log("userId: ", userId);
  const [userInput, setUserInput] = useState<string>("");
  const { isLoading, error, submitImageCreate, prediction } = useImageCreateSubmit(supabase);
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => setUserInput(e.target.value);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents the default form submission action
    console.log("ImageCreateForm (userInput): ", userInput);
    console.log("ImageCreateForm (modelId): ", modelId);
    console.log("ImageCreateForm (userId): ", userId);
    if (!modelId || !userId) {
      console.error("No model selected or user not found");
      return;
    }
    await submitImageCreate(userInput, modelId, userId);
  };

  return (
    <form className="form-input" onSubmit={handleSubmit}>
     <InputGroup>
     <Input
     width="80vw"
     placeholder="Enter text for image creation"
     aria-label="Text for image creation"
     value={userInput}
     disabled={isLoading}
     onChange={handleInputChange}
   />
   
        
      <Button type="submit" className="submit-button" disabled={isLoading}>
        {isLoading ? "Processing..." : "Submit"}
      </Button>
      </InputGroup>
      {error && <Alert>{error}</Alert>}
      {prediction && {prediction}}
    </form>
  );
};

export default ImageCreateForm;
