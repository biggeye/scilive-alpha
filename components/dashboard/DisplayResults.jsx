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
  finalPredictionState,
  modelBootProgressState,
  modelBootResultState,
} from "@/state/prediction-atoms";
import { exampleImageState } from "@/state/selected_model-atoms";

const DisplayResults = () => {
  const theme = useTheme();
  const setExampleImage = useSetRecoilState(exampleImageState);
  const setUserImageUpload = useSetRecoilState(userImageUploadState);

  const [displayedImage, setDisplayedImage] = useState(null);

  const modelBootProgress = useRecoilValue(modelBootProgressState);
  const modelBootResult = useRecoilValue(modelBootResultState);
  const predictionStatus = useRecoilValue(predictionStatusState);
  const predictionProgress = useRecoilValue(predictionProgressState);
  const predictionResult = useRecoilValue(predictionResultState);
  const finalPrediction = useRecoilValue(finalPredictionState);
  const userImageUpload = useRecoilValue(userImageUploadState);
  const exampleImage = useRecoilValue(exampleImageState);

  useEffect(() => {
    if (finalPrediction) {
      setDisplayedImage(finalPrediction);
      setExampleImage(null);
      setUserImageUpload(null);
    } else if (userImageUpload) {
      const objectURL = URL.createObjectURL(userImageUpload);
      setDisplayedImage(objectURL);
      return () => URL.revokeObjectURL(objectURL);
    } else if (exampleImage) {
      setDisplayedImage(exampleImage);
    }
  }, [finalPrediction, userImageUpload, exampleImage, setExampleImage, setUserImageUpload]);

  return (
    <Card>
      <CardHeader>
        <Flex display="row" justifyContent="space-between">
  <Tag size="xs">{predictionResult}</Tag>
        
        </Flex>
      </CardHeader>

      <CardBody>
        {displayedImage ? (
          <Image

            maxHeight="50vh"
            width="auto"
            src={displayedImage}
            alt="Selected or Processed"
            boxShadow="0 10px 20px rgba(0, 0, 0, 0.4)"
            borderRadius=".2rem"
          />
        ) : (
          <Skeleton

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

            <Center animation={theme.animations.fadeIn || 'none'}>
              {modelBootResult}
              <Progress value={modelBootProgress} />
            </Center>
          
          <Spacer />
  
            <Center>
              <Box animation={theme.animations.fadeIn || 'none'}>
                <CircularProgress
                  value={predictionProgress}
                  isIndeterminate={predictionProgress === null}
                  color="green.300"
                  marginBottom=".25rem"
                />
              </Box>
            </Center>
          
        </Flex>
      </CardFooter>
    </Card>
  );
};

export default DisplayResults;
