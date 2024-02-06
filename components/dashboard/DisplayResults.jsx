"use client";
import React, { useState, useEffect } from "react";
import {
  useTheme,
  Flex,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Center,
  Grid,
  GridItem,
  Box,
  Spacer,
  Text,
  Progress,
  Tag,
  Image,
  Skeleton,
  CircularProgress,
  VStack,
} from "@chakra-ui/react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  predictionResultState,
  predictionErrorState,
  predictionProgressState,
  userImageUploadState,
  userImagePreviewState,
  finalPredictionState,
  finalPredictionPromptState,
  modelBootProgressState,
  modelBootResultState,
  predictionIsLoadingState,
  predictionStatusState,
} from "@/state/prediction-atoms";
import {
  selectedModelFriendlyNameState,
  selectedModelShortDescState,
  selectedModelNameState,
  exampleImageState,
  examplesLoadingState,
  userContentExamplesState,
} from "@/state/config-atoms";
import { ScrollableThumbnails } from "../ScrollableThumbnails";
import ProgressIndicator from "../CircularProgress";
import { fadeIn, fadeOut, pulse } from "@/app/theme";// Assuming animations are correctly exported
import { talkVideoUrlState } from "@/state/d_id_talk";
import ToolOptions from "./ToolOptions";
import PredictionProgressMonitor from "./replicate/PredictionProgressMonitor";

const DisplayResults = () => {
  const [displayedImage, setDisplayedImage] = useState(null);

  const predictionIsLoading = useRecoilValue(predictionIsLoadingState);
  const modelBootResult = useRecoilValue(modelBootResultState);
  const predictionStatus = useRecoilValue(predictionStatusState);

  const predictionProgress = useRecoilValue(predictionProgressState);
  const exampleImage = useRecoilValue(exampleImageState);
  const selectedModelFriendlyName = useRecoilValue(
    selectedModelFriendlyNameState
  );
  const selectedModelShortDesc = useRecoilValue(selectedModelShortDescState);
  const selectedModelName = useRecoilValue(selectedModelNameState);
  const userImagePreview = useRecoilValue(userImagePreviewState);

  const finalPrediction = useRecoilValue(finalPredictionState);
  const finalPredictionPrompt = useRecoilValue(finalPredictionPromptState);

  useEffect(() => {
    if (finalPrediction) {
      setDisplayedImage(finalPrediction);
      return;
    } else if (userImagePreview) {
      setDisplayedImage(userImagePreview);
      return;
    } else if (exampleImage) {
      setDisplayedImage(exampleImage);
    }
  }, [finalPrediction, userImagePreview, exampleImage]);

  return (
    <Box height="100%" m="25px">
      <Flex direction="column">
        <Center>
          <VStack>
            <ToolOptions />
            {predictionIsLoading ? (
              <Card width="80vw"
                height="50vh" 
                className="animated-shadow" // Ensure you have defined this class in your CSS with the desired animations
               >
                   <Flex direction="column" justifyContent="spaced-evenly">
                  {modelBootResult === "loading" && (
                    <CircularProgress isIndeterminate />
                  )}
           
                  <Text> Model Status: {modelBootResult}</Text>
                  <Spacer />
                  <Text>Prediction Status: {predictionStatus}</Text>
                  </Flex>
              
                </Card>
            ) : (
              <Card className="animated-shadow">
                  <Image
                    width={{ base: "50vh", md: "60vh" }}
                    maxWidth="70vw"
                    height="auto"
                    src={displayedImage}
                    alt="sciGenerate"
                  
                    borderRadius=".5rem"
                  />
              {finalPrediction &&  
              <>  
                  <Text>Prompt: {finalPredictionPrompt}</Text>
                  <Text>Model: {selectedModelFriendlyName}</Text>
                  </>}
                </Card>
            )}
          </VStack>
        </Center>
      </Flex>
    </Box>
  );
};

export default DisplayResults;
