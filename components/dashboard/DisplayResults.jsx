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
    <div style={{ 
      maxHeight: '750px', 
      overflow: 'auto', 
      display: 'flex', 
      justifyContent: 'center',
      alignItems: 'center',
      padding: '35px'
    }}>
      {displayedImage ? (
        <div style={{
          maxWidth: '80%', 
          maxHeight: '550px',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
          borderRadius: '10px',
          transform: 'translateZ(0) scale(1.0, 1.0)',
          transition: 'transform 0.5s',
          ':hover': {
            transform: 'translateZ(0) scale(1.05, 1.05)'
          }
        }}>
          <img 
            src={displayedImage} 
            alt="Selected or Processed" 
            style={{ 
              width: '100%', 
              height: 'auto'
            }}
          />
        </div>
      ) : (
        <div className="imageSkeleton">
          </div>
      )}
      </div>
)}

export default DisplayResults;