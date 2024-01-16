'use client';
import React, { useState, FormEvent, ChangeEvent } from "react";
import { useImageCreateSubmit } from "@/lib/replicate/useImageCreateSubmit";
import { CircularProgress, FormControl, Input, InputGroup, Alert, Button, InputRightAddon } from "@chakra-ui/react";
import { useUserContext } from "@/lib/UserProvider";
import { useRecoilValue } from "recoil";
import { selectedModelIdState } from "@/state/selected_model-atoms";
import { predictionProgressState } from "@/state/prediction-atoms";

const ImageCreateForm: React.FC = () => {
  const { supabase } = useUserContext();
  const { userProfile } = useUserContext();
  const userId = userProfile.id;
  const [userInput, setUserInput] = useState<string>("");

  const { isLoading, error, submitImageCreate } = useImageCreateSubmit(supabase);
  const modelId = useRecoilValue(selectedModelIdState);
  const predictionProgress = useRecoilValue(predictionProgressState);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => setUserInput(e.target.value);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!modelId || !userId) {
      console.error("No model selected or user not found");
      return;
    }
    await submitImageCreate(userInput);
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
          <InputRightAddon>
            <Button type="submit" disabled={isLoading} size="sm">
              {isLoading ? <CircularProgress size="20px" value={predictionProgress} /> : "Submit"}
            </Button>
          </InputRightAddon>
        </InputGroup>
        {error && <Alert>{error}</Alert>}
      </form>
    </FormControl>
  );
};

export default ImageCreateForm;
