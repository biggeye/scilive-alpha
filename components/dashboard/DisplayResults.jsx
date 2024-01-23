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

const DisplayResults = () => {
  const theme = useTheme();

  const [displayedImage, setDisplayedImage] = useState(null);

  const predictionIsLoading = useRecoilValue(predictionIsLoadingState);
  const examplesLoading = useRecoilValue(examplesLoadingState);

  const predictionProgress = useRecoilValue(predictionProgressState);
  const modelBootProgress = useRecoilValue(modelBootProgressState);
   const modelBootResult = useRecoilValue(modelBootResultState);
  const predictionResult = useRecoilValue(predictionResultState);

  const exampleImage = useRecoilValue(exampleImageState);
  const selectedModelFriendlyName = useRecoilValue(
    selectedModelFriendlyNameState
  );
  const selectedModelShortDesc = useRecoilValue(selectedModelShortDescState);
  const selectedModelName = useRecoilValue(selectedModelNameState);
  const userContentExamples = useRecoilValue(userContentExamplesState);
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
<Box>
      {predictionIsLoading ? ( 
        <Skeleton 
    
         height={{ base: "50vh", md: "60vh" }}
          width="auto"
          boxShadow="0px 4px 1px rgba(0, 0, 0, 0.4)"
          borderRadius=".5rem" />
      ) : (
        <Image
        
          height={{ base: "50vh", md: "60vh" }}
          width="auto"
          src={displayedImage}
          alt="sciGenerate"
          boxShadow="0px 4px 1px rgba(0, 0, 0, 0.4)"
          borderRadius=".5rem"
        />)}
     </Box>        
  );
};

export default DisplayResults;
