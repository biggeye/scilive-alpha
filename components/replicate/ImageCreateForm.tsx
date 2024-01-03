'use client';

import React, { useState, FormEvent, ChangeEvent } from "react";
import { SupabaseClient } from '@supabase/supabase-js';
import { useImageCreateSubmit } from "@/lib/replicate/useImageCreateSubmit";
import { Input, InputGroup } from "@chakra-ui/react";

// TypeScript interface for props
interface ImageCreateFormProps {
  modelId: string;
  supabase: SupabaseClient;
  userId: string;
}

const ImageCreateForm: React.FC<ImageCreateFormProps> = ({ modelId, supabase, userId }) => {
  // State for storing user input with type string
  const [userInput, setUserInput] = useState<string>("");

  // Custom hook for image creation submission
  const { isLoading, error, submitImageCreate, newPrediction } = useImageCreateSubmit(supabase);

  // Handler for input change with event type annotation
  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => setUserInput(e.target.value);

  // Handler for form submission with event type annotation
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
     width="80%"
     placeholder="Enter text for image creation"
     aria-label="Text for image creation"
value={userInput}
     disabled={isLoading}
   />
     </InputGroup>
        
      <button type="submit" className="submit-button" disabled={isLoading}>
        {isLoading ? "Processing..." : "Submit"}
      </button>
      {error && <div className="error">{error}</div>}
      {newPrediction && <div>New Prediction: {newPrediction}</div>}
    </form>
  );
};

export default ImageCreateForm;
