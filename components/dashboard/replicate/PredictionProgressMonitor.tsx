'use client'
import React from 'react';
import { useRecoilValue } from 'recoil';
import {
  CircularProgress,
  Button,
  Box,
  CircularProgressLabel,
  Skeleton
} from '@chakra-ui/react';
import {
  predictionStatusState,
  predictionProgressState,
  modelBootProgressState,
} from '@/state/prediction-atoms'; // Assuming these atoms are exported from the provided path

// Component to monitor and display prediction progress
const PredictionProgressMonitor: React.FC = () => {
  // Recoil state
  const predictionStatus = useRecoilValue(predictionStatusState);
  const predictionProgress = useRecoilValue(predictionProgressState);
  const modelBootProgress = useRecoilValue(modelBootProgressState);

  // Determine if model is booting
  const isBooting = predictionStatus === 'starting';
  const hasBooted = predictionStatus === 'processing';

  // Handler for clearing UI, allowing webhook to catch the finished prediction
  const handleClearUI = () => {
    // Logic to clear the UI and reset states if needed
    console.log('UI cleared for webhook processing');
  };

  return (
    <Box textAlign="center" py={5}>
          <Skeleton
                height={{ base: "50vh", md: "60vh" }}
                width="auto"
                boxShadow="0px 4px 1px rgba(0, 0, 0, 0.4)"
                borderRadius=".5rem"
              />
      {isBooting ? (
        <CircularProgress isIndeterminate color="blue.300">
          <CircularProgressLabel>Booting...</CircularProgressLabel>
        </CircularProgress>
      ) : hasBooted && predictionProgress ? (
        <CircularProgress value={predictionProgress} color="green.400">
          <CircularProgressLabel>{predictionProgress}%</CircularProgressLabel>
        </CircularProgress>
      ) : null}
      <Box mt={4}>
        {predictionStatus === 'starting' && (
          <Button colorScheme="teal" onClick={handleClearUI}>
            Clear UI
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default PredictionProgressMonitor;
