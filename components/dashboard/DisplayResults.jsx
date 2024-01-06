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
  Tag
} from "@chakra-ui/react";

const DisplayResults = ({
  tool,
  selectedImage,
  exampleImage,
  }) => {
  
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
            <div className="imageSkeleton">
              <img src={displayedImage} alt="Selected or Processed" />
            </div>
          ) : (
            <div className="imageSkeleton"></div>
          )}
        </Center>
      </CardBody>

      <CardFooter>
        <Flex justifyContent="space-evenly">
        <Text size="xs">{predictionResult}{" "}</Text>
        <Spacer />
        <Flex direction="column" bgColor="gray" borderColor="darkgrey" borderWidth={.5}>
        
           {progress &&     <Progress value={progress} />}
      {predictionResult &&  <Tag size="xs">{predictionResult}</Tag>}
          </Flex>
      </Flex>
      </CardFooter>
    </Card>
  );
};

export default DisplayResults;
