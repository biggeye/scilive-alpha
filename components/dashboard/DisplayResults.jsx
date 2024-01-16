"use client";
import {
  predictionResultState,
  predictionErrorState,
  predictionStatusState,
  predictionProgressState,
  userImageUploadState,
  finalPredictionState,
  modelBootProgressState,
  modelBootResultState,
} from "@/state/prediction-atoms";
import { exampleImageState } from "@/state/selected_model-atoms";
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
import { useRecoilValue } from "recoil";

const DisplayResults = ({ tool, selectedImage }) => {
  const theme = useTheme();

 
  const [displayedImage, setDisplayedImage] = useState(null);

  const modelBootProgress = useRecoilValue(modelBootProgressState);
  const modelBootResult = useRecoilValue(modelBootResultState);

  const predictionStatus = useRecoilValue(predictionStatusState);
  const predictionProgress = useRecoilValue(predictionProgressState);
  const predictionResult = useRecoilValue(predictionResultState);
  const error = useRecoilValue(predictionErrorState);
  const finalPrediction = useRecoilValue(finalPredictionState);

  const userImageUpload = useRecoilValue(userImageUploadState);
  const exampleImage = useRecoilValue(exampleImageState);

  useEffect(() => {
    if (finalPrediction) {
      setDisplayedImage(finalPrediction);
    }
  }, [finalPrediction]);

  useEffect(() => {
    if (userImageUpload) {
      const objectURL = URL.createObjectURL(userImageUpload);
      setDisplayedImage(objectURL);
      return () => URL.revokeObjectURL(objectURL);
    }
  }, [userImageUpload]);

  useEffect(() => {
    if (exampleImage) {
      setDisplayedImage(exampleImage);
    }
  }, [exampleImage]);

  return (
    <Card>
      <CardHeader>
        <Flex display="row" justifyContent="space-between">
          {predictionResult && <Tag size="xs">{predictionResult}</Tag>}
          <Spacer />
          {predictionStatus && <Tag size="xs">Model Status: {predictionStatus}</Tag>}
        </Flex>
      </CardHeader>

      <CardBody>
        {displayedImage ? (
          <Image 
          animation={theme.animations.fadeIn || 'none'} 
            maxHeight="50vh"
            width="auto"
            src={displayedImage}
            alt="Selected or Processed"
            boxShadow="0 10px 20px rgba(0, 0, 0, 0.4)"
            borderRadius=".2rem"
          />
        ) : (
          <Skeleton   animation={theme.animations.fadeIn || 'none'} 
            maxHeight="50vh"
            width="auto"
            boxShadow="0 5px 7px rgba(0, 0, 0, 0.4)"
          />
        )}
      </CardBody>

      <CardFooter>
        <Flex
          width="100%"
          bgColor="gray"
          direction="column"
          borderRadius="md"
          borderColor="darkgrey"
          borderWidth={0.5}
          justifyContent="space-around"
        >
          {modelBootProgress && (
            <Center  animation={theme.animations.fadeIn || 'none'} >
              {modelBootResult}
              <Progress value={modelBootProgress} />
            </Center>
          )}
          <Spacer />
          {predictionProgress >= 1 && (
            <Center>
              <Box animation={theme.animations.fadeIn || 'none'} >
                <CircularProgress
                  value={predictionProgress}
                  isIndeterminate={predictionProgress === null}
                  color="green.300"
                />
                <Text ml={2}>{predictionResult}</Text>
              </Box>
            </Center>
          )}
        </Flex>
      </CardFooter>
    </Card>
  );
};

export default DisplayResults;
