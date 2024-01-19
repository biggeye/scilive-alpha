import React, { useState, FormEvent, ChangeEvent } from "react";
import { Box, CircularProgress, FormControl, Input, InputGroup, Alert, Button, InputRightAddon } from "@chakra-ui/react";
import { useUserContext } from "@/lib/UserProvider";
import { useRecoilValue } from "recoil";
import { selectedModelIdState } from "@/state/config-atoms";
import { predictionStatusState, predictionIsLoadingState, predictionErrorState } from "@/state/prediction-atoms";
import { useImageCreateSubmit } from "@/lib/replicate/useImageCreateSubmit";

const ImageCreateForm: React.FC = () => {
  const { supabase, userProfile } = useUserContext();
  const userId = userProfile?.id;

  const [userInput, setUserInput] = useState<string>("");
  const modelId = useRecoilValue(selectedModelIdState);
  const predictionIsLoading = useRecoilValue(predictionIsLoadingState);
  const predictionError = useRecoilValue(predictionErrorState);
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => setUserInput(e.target.value);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!modelId || !userId) {
      console.error("No model selected or user not found");
      return;
    }
    await useImageCreateSubmit({supabase}, {userInput});
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
  