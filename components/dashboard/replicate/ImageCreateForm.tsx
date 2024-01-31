import React, { useState, FormEvent, ChangeEvent } from "react";
import { Box, CircularProgress, FormControl, Input, InputGroup, Alert, Button, InputRightAddon } from "@chakra-ui/react";
import { useUserContext } from "@/lib/UserProvider";
import { useRecoilValue, useRecoilState } from "recoil";
import { selectedModelIdState } from "@/state/config-atoms";
import { finalPredictionState, predictionIsLoadingState, predictionErrorState } from "@/state/prediction-atoms";
import { useImageCreateSubmit } from "@/lib/replicate/useImageCreateSubmit";

const ImageCreateForm: React.FC = () => {
  const { supabase, userProfile } = useUserContext();
  const userId = userProfile?.id;

  const [userInput, setUserInput] = useState<string>("");
  const modelId = useRecoilValue(selectedModelIdState);
  const [predictionIsLoading, setPredictionIsLoading] = useRecoilState(predictionIsLoadingState);

  const finalPrediction = useRecoilValue(finalPredictionState);
  const predictionError = useRecoilValue(predictionErrorState);
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => setUserInput(e.target.value);

  // Initialize the hook at the top level and get the function
  const imageCreateSubmit = useImageCreateSubmit(supabase, userInput);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPredictionIsLoading(true);
    if (!modelId || !userId) {
      console.error("No model selected or user not found");
      return;
    }
    // Call the function returned by useImageCreateSubmit
    await imageCreateSubmit(userInput);

  };
  
  return (
    <Box>
      <FormControl>
        <form onSubmit={handleSubmit}>
          <InputGroup>
            <Input
              placeholder="Enter text for image creation"
              aria-label="Text for image creation"
              value={userInput}
              disabled={predictionIsLoading}
              onChange={handleInputChange}
            />
            <InputRightAddon>
              <Button type="submit" disabled={predictionIsLoading}>
                Submit
              </Button>
            </InputRightAddon>
          </InputGroup>
          {predictionError && <Alert>{predictionError}</Alert>}
        </form>
      </FormControl>
    </Box>
  );
};

export default ImageCreateForm;
  