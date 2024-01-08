"use client";
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
  Skeleton,
} from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { userImageUploadState } from "@/state/prediction-atoms";
import { exampleImageState } from "@/state/prediction-atoms"

const DisplayResults = ({ tool, selectedImage }) => {
  const [displayedImage, setDisplayedImage] = useState(null);
  const predictionResult = useRecoilValue(predictionResultState);
  const prediction = useRecoilValue(predictionState);
  const progress = useRecoilValue(predictionProgressState);
  const userImageUpload = useRecoilValue(userImageUploadState);
  const exampleImage = useRecoilValue(exampleImageState);

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
              height="50vh" 
              src={displayedImage} 
              alt="Selected or Processed"   
              boxShadow="0 10px 20px rgba(0, 0, 0, 0.4)" 
              borderRadius=".2rem" 
            />
          : <Skeleton 
              width={640} 
              height={480}   
              boxShadow="0 5px 7px rgba(0, 0, 0, 0.4)"
            />
        }
        <Flex justifyContent="space-evenly" direction="column">
          {predictionResult && <Tag size="xs">{predictionResult}</Tag>}
          <Spacer />
        </Flex>
      </CardBody>
    
      <CardFooter>
        <Flex
            direction="column"
            bgColor="gray"
            borderColor="darkgrey"
            borderWidth={0.5}
          >
            {progress && <Progress value={progress} />}
          </Flex>
      </CardFooter>
    </Card>
  );
};

export default DisplayResults;
