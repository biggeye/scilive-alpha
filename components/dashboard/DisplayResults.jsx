"use client";
import { useRecoilValue } from "recoil";
import {
  predictionState,
  predictionResultState,
} from "@/state/prediction-atoms";
import { predictionProgressState } from "@/state/prediction-atoms";
import React, { useState, useEffect } from "react";
import {
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
  Skeleton
} from "@chakra-ui/react";
import Canvas from "../Canvas";

const DisplayResults = ({ tool, selectedImage, exampleImage }) => {
  const [displayedImage, setDisplayedImage] = useState(
    exampleImage || selectedImage
  );
  const predictionResult = useRecoilValue(predictionResultState);
  const prediction = useRecoilValue(predictionState);
  const progress = useRecoilValue(predictionProgressState);

  useEffect(() => {
    if (prediction) {
      alert(prediction);
      setDisplayedImage(prediction);
    } else if (prediction && prediction.imageURL) {
      setDisplayedImage(prediction.imageURL);
    } else {
      setDisplayedImage(selectedImage || exampleImage);
    }
  }, [prediction, selectedImage, exampleImage]);

  return (
    <Card>
      <CardHeader></CardHeader>
      <CardBody>
        <Center>
          {displayedImage ? (
            
              <Image src={displayedImage} alt="Selected or Processed" />
            
          ) : (
  <Skeleton />        )}
        </Center>
      </CardBody>

      <CardFooter>
        <Flex justifyContent="space-evenly" direction="column">
          {predictionResult && <Tag size="xs">{predictionResult}</Tag>}
          <Spacer />
          <Flex
            direction="column"
            bgColor="gray"
            borderColor="darkgrey"
            borderWidth={0.5}
          >
            {progress && <Progress value={progress} />}
          </Flex>
        </Flex>
      </CardFooter>
    </Card>
  );
};

export default DisplayResults;
