import { useState, useEffect } from "react";
import uploadPrediction from "./uploadPrediction";
import {
  predictionState,
  predictionErrorState,
  predictionResultState,
  predictionIdState,
  finalPredictionState
} from "@/state/prediction-atoms";
import { useRecoilState } from "recoil";
import { predictionProgressState } from "@/state/prediction-atoms";

export const useImageCreateSubmit = (supabase, userId) => {
  // local state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // global state
  const { userProfile } = useUserContext();
  const [prediction, setPrediction] = useRecoilState(predictionState);
  const [predictionError, setPredictionError] = useRecoilState(predictionErrorState);
  const [predictionResult, setPredictionResult] = useRecoilState(predictionResultState);
  const [predictionProgress, setPredictionProgress] = useRecoilState(predictionProgressState);
  const [predictionId, setPredictionId] = useRecoilState(predictionIdState);
  const [finalPrediction, setFinalPrediction] = useRecoilState(finalPredictionState);
  const userId = userProfile.id;
  const selectedModelId = useRecoilValue(selectedModelIdState);
  console.log("useImageCreateSubmit initialized");

  const submitImageCreate = async (userInput, modelId, userId) => {
    console.log("submitImageCreate called", { userInput, modelId, userId });
    setIsLoading(true);
    setPrediction(null);
    setPredictionError(null);
    setFinalPrediction(null);
    setPredictionResult(userInput);
    const requestBody = {
      prompt: userInput,
      version: modelId,
      stream: true,
    };
    console.log("Making POST request to /api/replicate", requestBody);
    try {
     

      
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DEFAULT_URL}/api/replicate`,
        {
          method: "POST",
          headers: {
            Authorization: `Token ${process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      const predictionResponse = await response.json();

      if (response.status !== 201) {
        throw new Error(predictionResponse.detail || 'Unknown error');
      }
  
      if (predictionResponse.id) {
        pollPredictionStatus(predictionResponse);
        setPredictionId(predictionResponse.id);
      }
    } catch (err) {
      console.error("Error in submitImageCreate", err.message);
      setError(err.message);
    } finally {
      console.log("submitImageCreate process completed");
    }
  };

  const pollPredictionStatus = async (predictionResponse) => {
    console.log("pollPredictionStatus called", predictionResponse);
    try {
      if (predictionResponse.status === "starting") {
        setPredictionProgress(1);
        setPredictionResult("Model booting up.  This may take a few minutes...");
      }
      const statusResponse = await fetch(
        `${process.env.NEXT_PUBLIC_DEFAULT_URL}/api/replicate/status`,
        {
          method: "POST",
          headers: {
            Authorization: `Token ${process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: predictionId }),
        }
      ); 

      if (!statusResponse.ok) {
        console.error("HTTP error in pollPredictionStatus", statusResponse.status);
        throw new Error(`HTTP error! status: ${statusResponse.status}`);
      setPredictionError(error)};

      const statusData = await statusResponse.json();
      console.log("Status data received", statusData);

      if (statusData.logs && typeof statusData.logs === "string") {
          const logLines = statusData.logs.split("\n");
          const lastLine = logLines[logLines.length - 2];
          const progressMatch = lastLine.match(/(\d+)%/);
          const progressPercentage = progressMatch
            ? parseInt(progressMatch[1])
            : null;
          if (progressPercentage !== null) {
            setPredictionProgress(progressPercentage);
            setPredictionResult(`Processing: ${progressPercentage}%`);
          } else {
            setPredictionProgress(progressPercentage);
            setPredictionResult(`Processing: ${progressPercentage}`);
          }
        }
  
        if (statusData.status === "succeeded") {
          handleSuccess(statusData);
        } else if (statusData.status === "failed") {
          setPredictionError(statusData.error);
        } else {
          setTimeout(() => pollPredictionStatus(predictionResponse), 3000);
        }
      } catch (err) {
        setPredictionError(`Error while polling prediction status: ${err.message}`);
      } 
      };
      const handleSuccess = async (statusData) => {
        const output = Array.isArray(statusData.output) ? statusData.output.flat() : [statusData.output];
        const uploadedImages = await Promise.all(
          output.map(fileUrl => uploadPrediction(fileUrl, userId, statusData.version, statusData.id, statusData.input.prompt, supabase))
        );
        setFinalPrediction(uploadedImages[uploadedImages.length - 1]); // Set the last image URL
    if (finalPrediction) {
      setIsLoading(false);
      setPredictionProgress(null);
      setPredictionResult(null);
      setPredictionId(null);
      setPrediction(null);
      setError(null);
    };
  

  }
  return {
    isLoading,         // Make sure isLoading is defined and updated in the hook
    error,             // And other relevant states and functions
    submitImageCreate
  };}
