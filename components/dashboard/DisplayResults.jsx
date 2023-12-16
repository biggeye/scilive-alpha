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
      justifyContent: 'center', // Center the card horizontally
      alignItems: 'center', // Center the card vertically
      padding: '20px' // Add some space around the card
    }}> {/* Scrollable container */}
      {displayedImage && (
        <div style={{
          maxWidth: '100%', 
          maxHeight: '600px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)', // Shadow for 3D effect
          borderRadius: '10px', // Rounded corners
          transform: 'translateZ(0) scale(1.0, 1.0)', // Subtle 3D effect
          transition: 'transform 0.5s',
          ':hover': {
            transform: 'translateZ(0) scale(1.05, 1.05)' // Slightly enlarge on hover
          }
        }}>
          <img 
            src={displayedImage} 
            alt="Selected or Processed" 
            style={{ 
              width: '100%', 
              height: 'auto' // Maintain aspect ratio
            }} // Image size constraints
          />
        </div>
      )}
      {/* {predictionProgress && (
        <CircularProgress variant="determinate" value={predictionProgress} />
      )} */}
    </div>
    
  );
};

export default DisplayResults;