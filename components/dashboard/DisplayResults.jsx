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
  predictionStatusState,
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
  const predictionStatus = useRecoilValue(predictionStatusState);
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
    <Grid
      templateAreas={{
        base: `"results"
             "description"
             "shortDesc"
             "carousel"`, // Mobile layout
        md: `"results description"
           "results shortDesc"
           "results carousel"`, // Larger screens layout
      }}
      gridTemplateRows={{
        base: "auto auto auto auto", // Mobile layout
        md: "50px 1fr 75px", // Larger screens layout
      }}
      gridTemplateColumns={{
        base: "auto", // Mobile layout
        md: "30vw auto", // Larger screens layout
      }}
      h="100%"
      gap="1"
      color="blackAlpha.700"
    >
      <GridItem
        m="7px"
        pl="2"
        borderTopLeftRadius="5"
        borderTopRightRadius="5"
        area={"results"}
      >
      {predictionIsLoading ? ( 
        <Skeleton 
    
         height={{ base: "30vh", md: "40vh" }}
          width="auto"
          boxShadow="0px 4px 1px rgba(0, 0, 0, 0.4)"
          borderRadius=".5rem" />
      ) : (
        <Image
        
          height={{ base: "30vh", md: "40vh" }}
          width="auto"
          src={displayedImage}
          alt="sciGenerate"
          boxShadow="0px 4px 1px rgba(0, 0, 0, 0.4)"
          borderRadius=".5rem"
        />)}
              </GridItem>

      <Flex direction="column" justifyContent="space-between">
        <GridItem p="2" m="5px" area={"description"}>
          <Card m="1" p=".5" width="100%">
            <Text fontWeight="bold" fontSize={{ base: "lg", md: "xl" }}>
              {selectedModelName}
            </Text>
          </Card>
        </GridItem>

        <GridItem p="2" m="2px" area={"shortDesc"}>
          <Card m="1" p=".5" width="100%">
            <Text fontSize={{ base: "xs", md: "sm" }}>
              {finalPrediction
                ? finalPredictionPrompt
                : typeof selectedModelShortDesc === "string"
                ? selectedModelShortDesc
                : selectedModelShortDesc.description}
            </Text>
          </Card>
        </GridItem>
      
      </Flex>
    </Grid>
  );
};

export default DisplayResults;
