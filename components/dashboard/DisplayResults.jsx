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
  exampleImageState,
} from "@/state/config-atoms";

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
                    "results promptExamples"
                    "results carousel"`}
      gridTemplateRows={"50px 1fr 75px"}
      gridTemplateColumns={"40vw 1fr"}
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
        <Card width="100%">
          <CardBody>
            <Image
              height="40vh"
              width="auto"
              src={displayedImage}
              alt="Selected or Processed"
              boxShadow="0 10px 20px rgba(0, 0, 0, 0.4)"
              borderRadius=".5rem"
            />
            <CardFooter>
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
            </CardFooter>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem pl="2" area={"description"}>
        Nav
      </GridItem>
      <GridItem pl="2" area={"promptExamples"}>
        Main
      </GridItem>
      <GridItem pl="2" area={"carousel"}>
        SMALL CAROUSEL OF THUMBNAIL IMAGES CREATED BY THE MODEL
      </GridItem>
    </Grid>
  );
};

export default DisplayResults;
