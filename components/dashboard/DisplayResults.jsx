"use client";
import {
  predictionState,
  predictionResultState,
  predictionErrorState,
  predictionIdState,
  predictionProgressState,
  userImageUploadState,
  exampleImageState,
  finalPredictionState
} from "@/state/prediction-atoms";

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
  Skeleton,
} from "@chakra-ui/react";
import { useRecoilValue } from "recoil";


const DisplayResults = ({ tool, selectedImage }) => {
  const [displayedImage, setDisplayedImage] = useState(null);


  const predictionResult = useRecoilValue(predictionResultState);
  const prediction = useRecoilValue(predictionState);
  const progress = useRecoilValue(predictionProgressState);
  const error = useRecoilValue(predictionErrorState);
  const finalPrediction = useRecoilValue(finalPredictionState);
  const userImageUpload = useRecoilValue(userImageUploadState);
  const exampleImage = useRecoilValue(exampleImageState);

  useEffect(() => {
    if (finalPrediction) {
 
      setDisplayedImage(finalPrediction);
    } else {
      setDisplayedImage(selectedImage || exampleImage);
    }
  }, [finalPrediction, selectedImage, exampleImage]);

  useEffect(() => {
    if (userImageUpload) {
      // Create a URL for the File object
      const objectURL = URL.createObjectURL(userImageUpload);
      setDisplayedImage(objectURL);

      // Clean up the object URL on component unmount
      return () => URL.revokeObjectURL(objectURL);
    }
  }, [userImageUpload]);
  
  useEffect(() => {
    if (exampleImage) {
      setDisplayedImage(exampleImage);
    }
  }, [exampleImage])

  return (
    <Card>
      <CardBody>
        {displayedImage 
          ? <Image 
              height="auto"
              minHeight="50vh" 
              width="75vw"
              src={displayedImage} 
              alt="Selected or Processed"   
              boxShadow="0 10px 20px rgba(0, 0, 0, 0.4)" 
              borderRadius=".2rem" 
            />
          : <Skeleton
              minHeight="50vh" 
              width="75vw" 
              height="auto"   
              boxShadow="0 5px 7px rgba(0, 0, 0, 0.4)"
            />
        }
       
      </CardBody>
    
      <CardFooter>
        <Flex
        width="100%"
            direction="column"
            bgColor="gray"
            borderColor="darkgrey"
            borderWidth={0.5}
            justifyContent="space-around"
          >
            <Spacer />
            {progress && <Progress value={progress} />}
        <Spacer />
          {predictionResult && <Tag size="xs">{predictionResult}</Tag>}
       <Spacer />
          </Flex>
      </CardFooter>
    </Card>
  );
};

export default DisplayResults;
