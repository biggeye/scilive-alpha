import React, { useState, FormEvent, ChangeEvent } from "react";
import { Box, FormControl, Input, InputGroup, Alert, Button, InputRightAddon } from "@chakra-ui/react";
import { useUserContext } from "@/lib/UserProvider";
import { useRecoilValue, useRecoilState } from "recoil";
import { selectedModelIdState } from "@/state/config-atoms";
import { predictionIsLoadingState, predictionErrorState, finalPredictionState } from "@/state/prediction-atoms";
import { useImageCreateSubmit } from "@/lib/replicate/useImageCreateSubmit";

const ImageCreateForm: React.FC = () => {
  // read state
  const { userProfile } = useUserContext();
  const userId = userProfile?.id;
  const modelId = useRecoilValue(selectedModelIdState);
  const predictionError = useRecoilValue(predictionErrorState);
  const finalPrediction = useRecoilValue(finalPredictionState);

  // set state
  const [userInput, setUserInput] = useState<string>("");
  const [predictionIsLoading, setPredictionIsLoading] = useRecoilState(predictionIsLoadingState);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => setUserInput(e.target.value);
  const imageCreateSubmit = useImageCreateSubmit();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPredictionIsLoading(true);
    if (!modelId || !userId) {
      console.error("No model selected or user not found");
      return;
    }
    await imageCreateSubmit(userInput);
    if (finalPrediction) {
       setPredictionIsLoading(false);
    }
  };
  
  return (
    <Box>
      <FormControl>
        <form onSubmit={handleSubmit}>
          <InputGroup   size={{ base: "sm", md: "md" }}>
            <Input

              fontSize={{ base: "sm", md: "md" }}
              placeholder="Enter text for image creation"
              aria-label="Text for image creation"
              value={userInput}
              disabled={predictionIsLoading}
              onChange={handleInputChange}
            />
            <InputRightAddon>
              <Button   size="sm" fontSize={{ base: "sm", md: "md" }} type="submit" disabled={predictionIsLoading}>
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
  