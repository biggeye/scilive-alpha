'use client'

import React, { useState, useEffect } from "react";

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
    <div className="displayResults">
   {displayedImage ? (
        <div className="imageSkeleton">
          <img src={displayedImage} alt="Selected or Processed" />
        </div>
      ) : (
        <div className="imageSkeleton"></div>
      )}
      </div>
)}

export default DisplayResults;