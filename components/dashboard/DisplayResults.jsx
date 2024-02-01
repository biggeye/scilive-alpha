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
  VStack
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
import { pulse } from "@/app/theme";
import { talkVideoUrlState } from "@/state/d_id_talk";
import ToolOptions from "./ToolOptions";

const DisplayResults = () => {
  const [displayedImage, setDisplayedImage] = useState(null);

  const talkVideoUrl = useRecoilValue(talkVideoUrlState);
  
  const predictionIsLoading = useRecoilValue(predictionIsLoadingState);
  const predictionProgress = useRecoilValue(predictionProgressState);
  const modelBootProgress = useRecoilValue(modelBootProgressState);
  const modelBootResult = useRecoilValue(modelBootResultState);
  const predictionResult = useRecoilValue(predictionResultState);
  
  const exampleImage = useRecoilValue(exampleImageState);
  const selectedModelFriendlyName = useRecoilValue(selectedModelFriendlyNameState);
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
        <ToolOptions />
          {predictionIsLoading ? (
              <VStack>
              <Skeleton
                height={{ base: "50vh", md: "60vh" }}
                width="auto"
                boxShadow="0px 4px 1px rgba(0, 0, 0, 0.4)"
                borderRadius=".5rem"
              />
              <CircularProgress value={predictionProgress} />
              <ProgressIndicator />
              </VStack>
          ) : (
            <React.Fragment>
              {talkVideoUrl && 
                <video
                  width="auto"
                  height={{ base: "50vh", md: "60vh" }}
                  controls
                >
                  <source src={talkVideoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              }
              <Image
                width={{ base: "50vh", md: "60vh" }}
                maxWidth="70vw"
                height="auto"
                src={displayedImage}
                alt="sciGenerate"
                boxShadow="0px -5px 25px rgba(0, 0, 0, 0.5)"
                borderRadius=".5rem"
                className="animated-shadow"
              />
            </React.Fragment>
          )}
        </Center>
</Flex>
    </Box>
  );
};

export default DisplayResults;
