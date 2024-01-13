import { useState, useEffect } from "react";
import uploadPrediction from "./uploadPrediction";
import {
  predictionState,
  predictionErrorState,
  predictionResultState,
  predictionIdState,
  finalPredictionState,
  predictionProgressState,
  modelBootProgressState,
  modelBootResultState
 } from "@/state/prediction-atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedModelIdState } from "@/state/selected_model-atoms"; 

export const useImageCreateSubmit = (supabase, userId) => {
  // global state value
  const modelId = useRecoilValue(selectedModelIdState);
  
  // local state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // global state-setters
  const [modelBootProgress, setModelBootProgress] = useRecoilState(modelBootProgressState);
  const [modelBootResult, setModelBootResult] = useRecoilState(modelBootResultState);
  const [predictionError, setPredictionError] = useRecoilState(predictionErrorState);
  const [predictionResult, setPredictionResult] = useRecoilState(predictionResultState);
  const [predictionProgress, setPredictionProgress] = useRecoilState(predictionProgressState);
  const [finalPrediction, setFinalPrediction] = useRecoilState(finalPredictionState);

  const submitImageCreate = async (userInput, userId) => {
    console.log("submitImageCreate called", { userInput, userId });
    setIsLoading(true);
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
      }
    } catch (err) {
      console.error("Error in submitImageCreate", err.message);
      setError(err.message);
    } finally {
      console.log("prediction submitted to Replicate server");
    }
  };

  const pollPredictionStatus = async (initialPredictionResponse) => {
    console.log("pollPredictionStatus called", initialPredictionResponse);
    let timer = 180; // 3 minutes in seconds
  
    const interval = setInterval(async () => {
      try {
        // Fetch the latest status
        const statusResponse = await fetch(`${process.env.NEXT_PUBLIC_DEFAULT_URL}/api/replicate/${initialPredictionResponse.id}`, {
          headers: {
            Authorization: `Token ${process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN}`
          }
        });
        const statusData = await statusResponse.json();
  
        // Update progress based on status
        if (statusData.status === "processing") {
          // Update progress based on logs or other indicators
          setPredictionProgress(calculateProgressFromLogs(statusData.logs));
        } else if (statusData.status === "succeeded") {
          clearInterval(interval);
          // Handle succeeded status (convert image URL to File, uploadPrediction, etc.)
          handleSucceededStatus(statusData);
          return;
        }
  
        // Handle other statuses (e.g., 'failed')
        if (statusData.status === "failed") {
          clearInterval(interval);
          setPredictionError("Prediction failed");
          return;
        }
  
        // Handle timeout
        if (--timer === 0) {
          clearInterval(interval);
          setPredictionError("Timeout reached");
          
        }
      } catch (err) {
        console.error("Error in pollPredictionStatus", err.message);
        clearInterval(interval);
        setError(err.message);
      }
    }, 1000);
  
    return () => clearInterval(interval); // Clear interval when component unmounts
  };
  

  return { submitImageCreate, isLoading, error };
};

const handleSucceededStatus = (statusData) => {
   setFinalPrediction(statusData.output);
}

export default useImageCreateSubmit;
