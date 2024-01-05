'use client'
import { useRecoilValue } from 'recoil';
import { predictionState, predictionResultState } from '@/state/prediction-atoms';

import React, { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, CardFooter, Center, Box } from "@chakra-ui/react";

const DisplayResults = ({
  tool,
  predictionProgress,
  selectedImage,
  exampleImage,
  newPrediction
}) => {
  const [displayedImage, setDisplayedImage] = useState(
    exampleImage || selectedImage);
  const predictionResult = useRecoilValue(predictionResultState);
  const prediction = useRecoilValue(predictionState);

  useEffect(() => {
    if (prediction) {
      alert("recoil is working", prediction);
      setDisplayedImage(prediction);
    } else if (prediction && prediction.imageURL) {
      setDisplayedImage(prediction.imageURL);
    } else {
      setDisplayedImage(selectedImage || exampleImage);
    }
  }, [prediction, selectedImage, exampleImage]);
  

  return (

    <Card>
      <CardHeader>

      </CardHeader>
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
{predictionResult}
      </CardFooter>
      </Card>
)}

export default DisplayResults;