'use client'

import React, { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, CardFooter, Center, Box } from "@chakra-ui/react";

const DisplayResults = ({
  tool,
  prediction,
  predictionProgress,
  selectedImage,
  exampleImage,
  newPrediction
}) => {
  const [displayedImage, setDisplayedImage] = useState(
    exampleImage || selectedImage || prediction
  );

  useEffect(() => {
    if (newPrediction) {
      setDisplayedImage(newPrediction);
    } else if (prediction && prediction.imageURL) {
      setDisplayedImage(prediction.imageURL);
    } else {
      setDisplayedImage(selectedImage || exampleImage);
    }
  }, [newPrediction, prediction, selectedImage, exampleImage]);
  

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

      </CardFooter>
      </Card>
)}

export default DisplayResults;