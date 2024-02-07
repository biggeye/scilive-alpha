"use client";
import React from "react";
import {
  Box,
  Flex,
  Center,
  VStack,
  Card,
  CircularProgress,
  Progress,
  Text,
} from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import {
  predictionIsLoadingState,
  modelBootResultState,
  predictionStatusState,
  predictionProgressState,
  finalPredictionState,
  finalPredictionPromptState,
  finalNarrativeState,
  userImagePreviewState,
} from "@/state/prediction-atoms";
import ToolOptions from "./ToolOptions";
import { ImageCard, NarrativeCard } from "../Cards";
import { exampleImageState, selectedModelFriendlyNameState } from "@/state/config-atoms";
// Assuming this function is elsewhere or needs to be added

const DisplayResults = () => {
  const predictionIsLoading = useRecoilValue(predictionIsLoadingState);
  const modelBootResult = useRecoilValue(modelBootResultState);
  const predictionStatus = useRecoilValue(predictionStatusState);
  const predictionProgress = useRecoilValue(predictionProgressState);
  const finalNarrative = useRecoilValue(finalNarrativeState);
  const finalPrediction = useRecoilValue(finalPredictionState);
  const finalPredictionPrompt = useRecoilValue(finalPredictionPromptState);
  const userImagePreview = useRecoilValue(userImagePreviewState);
  const exampleImage = useRecoilValue(exampleImageState);
  const selectedModelFriendlyName = useRecoilValue(selectedModelFriendlyNameState);

  function isValidHttpUrl(string) {
    let url;
  
    try {
      url = new URL(string);
    } catch (_) {
      return false;  
    }
  
    return url.protocol === "http:" || url.protocol === "https:";
  }
  

  return (
    <Box height="100%" m="25px">
      <Flex direction="column">
        <Center>
          <VStack>
            <ToolOptions />
            {predictionIsLoading ? (
              <Card className="image-card" borderColor="onyx" borderWidth="0.5px">
                <Flex direction="column" justifyContent="space-evenly">
                  {modelBootResult === "loading" && (
                    <CircularProgress isIndeterminate className="element-pulse" />
                  )}
                  <Text>Model Status: {modelBootResult}</Text>
                  <Progress value={predictionProgress} />
                  <Text>Prediction Status: {predictionStatus}</Text>
                </Flex>
              </Card>
            ) : finalPrediction ? (
              isValidHttpUrl(finalPrediction) ? (
                <ImageCard imageUrl={finalPrediction} prompt={finalPredictionPrompt} modelName={selectedModelFriendlyName} />
              ) : (
                <NarrativeCard narrative={finalPrediction} />
              )
            ) : finalNarrative ? (
              <VStack>
              <ImageCard imageUrl={userImagePreview} />
              <NarrativeCard narrative={finalNarrative} />
              </VStack>
            ) : userImagePreview || exampleImage ? (
              <ImageCard imageUrl={userImagePreview || exampleImage} />
            ) : null}
          </VStack>
        </Center>
      </Flex>
    </Box>
  );
};

export default DisplayResults;
