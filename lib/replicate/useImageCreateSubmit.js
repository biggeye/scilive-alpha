import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  predictionErrorState,
  predictionResultState,
  predictionProgressState,
  finalPredictionState,
  modelBootProgressState
} from "@/state/prediction-atoms";
import { selectedModelIdState } from "@/state/selected_model-atoms"; 
import uploadPrediction from "./uploadPrediction";
import { useUserContext } from "../UserProvider";

export const useImageCreateSubmit = (supabase) => {
  // Global state value
  const modelId = useRecoilValue(selectedModelIdState);
  const userProfile = useUserContext();
  const userId = userProfile.userProfile.id;
  // Local state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Global state-setters
  const [modelBootProgress, setModelBootProgress] = useRecoilState(modelBootProgressState);
  const [predictionError, setPredictionError] = useRecoilState(predictionErrorState);
  const [predictionResult, setPredictionResult] = useRecoilState(predictionResultState);
  const [predictionProgress, setPredictionProgress] = useRecoilState(predictionProgressState);
  const [finalPrediction, setFinalPrediction] = useRecoilState(finalPredictionState);

  const submitImageCreate = async (userInput) => {
    setIsLoading(true);
    setError(null);
    setPredictionError(null);
    setFinalPrediction(null);
    setPredictionResult(null);

    const requestBody = {
      prompt: userInput,
      version: modelId,
      stream: true,
    };

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
      setError(err.message);
      setPredictionError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const pollPredictionStatus = async (initialPredictionResponse) => {
    console.log("Starting to poll prediction status", initialPredictionResponse);
    console.log("userId: ", userId);
    const interval = setInterval(async () => {
      try {
        const statusResponse = await fetch
        (`${process.env.NEXT_PUBLIC_DEFAULT_URL}/api/replicate/status`, 
        {
          method: "POST",
          headers: {
            Authorization: `Token ${process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN}`,
          }, 
          body: JSON.stringify({ id: initialPredictionResponse.id })
        });
        const statusData = await statusResponse.json();

        if (statusData.status === "starting") {
          setPredictionResult("Model is booting up, please be patient!");
        } else if (statusData.status === "processing") {
          setPredictionProgress(calculateProgressFromLogs(statusData.logs));
        } else if (statusData.status === "succeeded") {
          clearInterval(interval);
          const predictionId = statusData.id;
          const modelId = statusData.version;
          let output = Array.isArray(statusData.output) ? statusData.output : [statusData.output];
          let file = output.length > 1 ? output[1] : output[0];
          const prompt = initialPredictionResponse.input.prompt;
          const imageUrl = await uploadPrediction(file, userId, modelId, predictionId, prompt, supabase);
          setFinalPrediction(imageUrl);
        } else if (statusData.status === "failed") {
          clearInterval(interval);
          setPredictionError('Prediction failed');
        }
      } catch (error) {
        clearInterval(interval);
        setError(error.message);
      }
    }, 5000); // Poll every 5 seconds
  };

  const calculateProgressFromLogs = (logs) => {
    // Implementation of this function depends on how logs are structured
    // This is a placeholder and needs to be replaced with actual logic
    return logs.length; // Example implementation
  };

  return { submitImageCreate, isLoading, error };
};
