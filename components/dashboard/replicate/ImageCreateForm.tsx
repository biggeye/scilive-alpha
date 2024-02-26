import React, { useState, FormEvent, ChangeEvent } from "react";
import { Box, FormControl, Input, InputGroup, Alert, Button, InputRightAddon } from "@chakra-ui/react";
import { useUserContext } from "@/lib/user/UserProvider";
import { useRecoilValue, useRecoilState } from "recoil";
import { selectedModelIdState } from "@/state/replicate/config-atoms";
import { predictionProgressState, userImageDataUriState, userImageUploadState, predictionIsLoadingState, predictionErrorState, finalPredictionState, globalLoadingState } from "@/state/replicate/prediction-atoms";
import { useImageCreateSubmit } from "@/lib/replicate/useImageCreateSubmit";
import { useToast } from "@chakra-ui/react";


const ImageCreateForm: React.FC = () => {

  const toast = useToast();
  // read state
  const { userProfile } = useUserContext();
  const userId = userProfile?.id;
  const modelId = useRecoilValue(selectedModelIdState);
  const predictionError = useRecoilValue(predictionErrorState);
  const finalPrediction = useRecoilValue(finalPredictionState);
  const predictionProgress = useRecoilValue(predictionProgressState);
  const [globalLoading, setGlobalLoading] = useRecoilState(globalLoadingState);
  // set state
  const [userInput, setUserInput] = useState<string>("");
  const [predictionIsLoading, setPredictionIsLoading] = useRecoilState(predictionIsLoadingState);
  const [userImageUpload, setUserImageUpload] = useRecoilState(userImageUploadState);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => setUserInput(e.target.value);
  const imageCreateSubmit = useImageCreateSubmit();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPredictionIsLoading(true);
    setGlobalLoading(true);
    if (!modelId || !userId) {
      console.error("No model selected or user not found");
      return;
    }
    const prediction_id = await imageCreateSubmit(userInput);
    if (prediction_id) {
       toast({
        title: 'Processing',
        description: `Your image is now processing (ID: ${prediction_id}).  You will be notified upon completion.`,
        status: 'info',
        duration: 9000,
        isClosable: true,
       });
    } else if (finalPrediction) {
      setPredictionIsLoading(false);
      setGlobalLoading(false);
    }
  };

  return (
    <Box>
      <FormControl>
        <form onSubmit={handleSubmit}>
          <InputGroup size={{ base: "sm", md: "md" }}>
            <Input
              fontSize={{ base: "sm", md: "md" }}
              placeholder="Enter text for image creation"
              aria-label="Text for image creation"
              value={userInput}
              disabled={predictionIsLoading}
              onChange={handleInputChange}
              sx={{
                '::placeholder': {
                  color: 'black',
                },
              }}
            />
            <InputRightAddon>
              {globalLoading ? (
                <Button size="sm" fontSize={{ base: "sm", md: "md" }} type="submit" isDisabled={true}>
                  Processing</Button>
              ) : (
                <Button size="sm" fontSize={{ base: "sm", md: "md" }} type="submit">
                  Submit
                </Button>
              )}
            </InputRightAddon>
          </InputGroup>
          {predictionError && <Alert>{predictionError}</Alert>}
        </form>
      </FormControl>
    </Box>
  );
};

export default ImageCreateForm;
