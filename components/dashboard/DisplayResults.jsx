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
  modelBootProgressState,
  modelBootResultState,
  predictionIsLoadingState,
} from "@/state/prediction-atoms";
import {
  selectedModelFriendlyNameState,
  selectedModelShortDescState,
  selectedModelNameState,
  exampleImageState,
  userContentExamplesState
} from "@/state/config-atoms";
import { ScrollableThumbnails } from "../ScrollableThumbnails";

const DisplayResults = () => {
  const theme = useTheme();

  const [displayedImage, setDisplayedImage] = useState(null);
  
  const predictionIsLoading = useRecoilValue(predictionIsLoadingState);
  const finalPrediction = useRecoilValue(finalPredictionState);
  const userImagePreview = useRecoilValue(userImagePreviewState);
  const exampleImage = useRecoilValue(exampleImageState);
  const predictionProgress = useRecoilValue(predictionProgressState);
  const modelBootProgress = useRecoilValue(modelBootProgressState);
  const modelBootResult = useRecoilValue(modelBootResultState);
  const predictionStatus = useRecoilValue(predictionStatusState);
  const predictionResult = useRecoilValue(predictionResultState);
  const selectedModelFriendlyName = useRecoilValue(selectedModelFriendlyNameState);
  const selectedModelShortDesc = useRecoilValue(selectedModelShortDescState);
  const selectedModelName = useRecoilValue(selectedModelNameState);
  const userContentExamples = useRecoilValue(userContentExamplesState);

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

  console.log("displayedImage:", displayedImage);

  return (
    <Grid
      templateAreas={`"results description"
                    "results shortDesc"
                    "results carousel"`}
      gridTemplateRows={"50px 1fr 75px"}
      gridTemplateColumns={"40vw 1fc"}
      h="100%"
      gap="1"
      color="blackAlpha.700"
      fontWeight="bold"
    >
      <GridItem
        pl="2"
        borderTopLeftRadius="5"
        borderTopRightRadius="5"
        area={"results"}
      >
   
            <Image
              height="40vh"
              width="auto"
              src={displayedImage}
              alt="Selected or Processed"
              boxShadow="0 10px 20px rgba(0, 0, 0, 0.4)"
              borderRadius=".5rem"
            />
           <Center>
              <Flex
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                {predictionProgress && (
                  <CircularProgress value={predictionProgress} />
                )}
                <Spacer />
                {predictionStatus && JSON.stringify(predictionStatus)}
              </Flex>
              </Center>
      </GridItem>
   <Flex direction="column" justifyContent="space-between">
      <GridItem pr="2" area={"description"}>
        <Card m="1" p=".5" width="100%">
        {selectedModelName}

        </Card>
      </GridItem>
      
      <GridItem pr="2" area={"shortDesc"}>
        <Card m="1" p=".5" width="100%">
       
        {selectedModelShortDesc}
        </Card>
      </GridItem>
      <GridItem pr="2" area={"carousel"}>
        <Card mt="1" p=".5">
          <ScrollableThumbnails images={userContentExamples} />
        </Card>
      </GridItem>
      </Flex>
    </Grid>
  );
};

export default DisplayResults;
