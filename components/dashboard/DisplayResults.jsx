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
  predictionStatusState,
  predictionProgressState,
  userImageUploadState,
  userImagePreviewState,
  finalPredictionState,
  modelBootProgressState,
  modelBootResultState,
  predictionIsLoadingState,
} from "@/state/prediction-atoms";
import { exampleImageState } from "@/state/selected_model-atoms";

const DisplayResults = () => {
  const theme = useTheme();

  const [displayedImage, setDisplayedImage] = useState(null);
  
  const finalPrediction = useRecoilValue(finalPredictionState);
  const userImagePreview = useRecoilValue(userImagePreviewState);
  const exampleImage = useRecoilValue(exampleImageState);
  const predictionProgress = useRecoilValue(predictionProgressState);
  const modelBootProgress = useRecoilValue(modelBootProgressState);
  
  useEffect(() => {
    console.log("finalPrediction:", finalPrediction);
    console.log("userImagePreview:", userImagePreview);
    console.log("exampleImage:", exampleImage);

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
 /* 
  const predictionStatusDisplay = async () => {
    if (predictionIsLoading==='true') {
      return (
        <Flex direction="column">
          {modelBootProgress &&
        <CircularProgress value={modelBootProgress} />}
          {predictionProgress &&
        <Progress width="95%" value={predictionProgress} />}
        </Flex>
        )} else {
          return null;
  }};
  */
  console.log('displayedImage:', displayedImage);

  return (
    <Card width="80vw">
      <CardHeader>
      <Flex direction="column">
        {predictionStatusDisplay}
         <Spacer />
        {modelBootProgress && { modelBootProgress }}
         <Spacer />
        {modelBootResult && { modelBootResult }}
        </Flex>
      </CardHeader>
      <CardBody>
        <Image
          maxHeight="70vh"
          width="auto"
          src={displayedImage}
          alt="Selected or Processed"
          boxShadow="0 10px 20px rgba(0, 0, 0, 0.4)"
          borderRadius=".2rem"
        />
        <CardFooter>
        <Flex direction="column">
        {circularProgress && <CircularProgress value={predictionProgress} />}
        <Spacer />
        {predictionStatus && {predictionStatus}}
        <Spacer />
        {predictionResult && {predictionResult}}
        </Flex>
        </CardFooter>
  
      </CardBody>
    </Card>
  );
}

export default DisplayResults;
