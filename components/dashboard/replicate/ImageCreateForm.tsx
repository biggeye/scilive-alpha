'use client';
import React, { useState, FormEvent, ChangeEvent } from "react";
import { useImageCreateSubmit } from "@/lib/replicate/useImageCreateSubmit";
import { FormControl, Input, InputGroup, Alert, Button, InputRightAddon } from "@chakra-ui/react";
import { useUserContext } from "@/lib/UserProvider";
import { createClient } from "@/utils/supabase/client";
import { useRecoilValue } from "recoil";
import { selectedModelIdState } from "@/state/selected_model-atoms";
interface ImageCreateFormProps {
  modelId: string;
  supabase: any;
  userId: string;
}

const ImageCreateForm: React.FC<ImageCreateFormProps> = () => {
  const { userProfile } = useUserContext();
  const userId = userProfile.id;
  const [userInput, setUserInput] = useState<string>("");
  const supabase = createClient();
  const { isLoading, error, submitImageCreate } = useImageCreateSubmit(supabase);
  const modelId = useRecoilValue(selectedModelIdState);
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => setUserInput(e.target.value);


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents the default form submission action
    console.log("userId: ", userId);
    console.log("modelId: ", modelId);
    if (!modelId || !userId) {
      console.error("No model selected or user not found");
      return;
    }
    await submitImageCreate(userInput, modelId, userId);
  };

  return (

    <FormControl>
      <form onSubmit={handleSubmit}>
        <InputGroup>
          <Input
            size="sm"

            placeholder="Enter text for image creation"
            aria-label="Text for image creation"
            value={userInput}
            disabled={isLoading}
            onChange={handleInputChange}
          />
          <InputRightAddon> <Button type="submit" disabled={isLoading} size="sm">
            {isLoading ? "Processing..." : "Submit"}
          </Button></InputRightAddon>


        </InputGroup>
        {error && <Alert>{error}</Alert>}
      </form>
    </FormControl>
  );
};

export default ImageCreateForm;
