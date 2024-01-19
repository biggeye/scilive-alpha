import { useState } from "react";
import uploadPrediction from "./uploadPrediction";
import {
  predictionStatusState,
  predictionErrorState,
  predictionResultState,
  predictionIsLoadingState,
  finalPredictionState,
  predictionProgressState,
  userImageUploadState,
  userImageDataUriState,
  modelBootProgressState,
  modelBootResultState,
} from "@/state/prediction-atoms";
import { selectedModelIdState } from "@/state/config-atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { useUserContext } from "../UserProvider";

export const useImageEditSubmit = (supabase) => {
  const modelId = useRecoilValue(selectedModelIdState);
  const userProfile = useUserContext();
  const userId = userProfile?.userProfile?.id; // Added optional chaining for safety

  const [modelBootResult, setModelBootResult] =
    useRecoilState(modelBootResultState);
  const [modelBootProgress, setModelBootProgress] = useRecoilState(
    modelBootProgressState
  );

  const [predictionIsLoading, setPredictionIsLoading] = useRecoilState(
    predictionIsLoadingState
  );
  const [predictionStatus, setPredictionStatus] = useRecoilState(
    predictionStatusState
  );
  const [predictionError, setPredictionError] =
    useRecoilState(predictionErrorState);
  const [predictionResult, setPredictionResult] = useRecoilState(
    predictionResultState
  );
  const [predictionProgress, setPredictionProgress] = useRecoilState(
    predictionProgressState
  );
  const [finalPrediction, setFinalPrediction] =
    useRecoilState(finalPredictionState);
  const userImageUpload = useRecoilValue(userImageDataUriState);

  const handleImageEditSubmit = async (userInput) => {
    setPredictionIsLoading(true);
    setPredictionError(null);
    setFinalPrediction(null);
    setPredictionResult(userInput);

    if (!userImageUpload) {
      console.log("No image found, please upload and try again");
      return null;
    }

    const requestBody = {
      image: userImageUpload,
      prompt: userInput,
      version: modelId,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DEFAULT_URL}/api/replicate`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        }
      );

      const predictionResponse = await response.json();
      console.log("Prediction response:", predictionResponse);

      if (response.status !== 201) {
        throw new Error(predictionResponse.detail || "Unknown error");
      }

      if (predictionResponse.id) {
        pollPredictionStatus(predictionResponse);
      }
    } catch (err) {
      console.error("Error in submitImageCreate:", err);
      setError(err.message);
      setPredictionError(err.message);
    }
  };

  const pollPredictionStatus = async (initialPredictionResponse) => {
    console.log(
      "Starting to poll prediction status",
      initialPredictionResponse
    );
    setPredictionStatus("starting");
    const interval = setInterval(async () => {
      try {
        const statusResponse = await fetch(
          `${process.env.NEXT_PUBLIC_DEFAULT_URL}/api/replicate/status`,
          {
            method: "POST",
            headers: {
              Authorization: `Token ${process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN}`,
            },
            body: JSON.stringify({ id: initialPredictionResponse.id }),
          }
        );
        const statusData = await statusResponse.json();
        console.log("Status data:", statusData);

        // Removed console log for userId, unnecessary for production
        if (statusData.status === "starting") {
          setPredictionResult("Model is booting up, please be patient!");
        } else if (statusData.status === "processing") {
          setModelBootResult("Model successfully loaded.");
          setPredictionResult("Image is processing");
          setPredictionStatus("processing");
          setPredictionProgress(calculateProgressFromLogs(statusData.logs));
        } else if (prediction.status === "succeeded") {
          setPredictionStatus(null);
          setPredictionResult("Processing complete.");
          clearInterval(interval);
          const predictionId = statusData.id;
          const modelId = statusData.version;
          let output = Array.isArray(statusData.output)
            ? statusData.output
            : [statusData.output];
          let file = output.length > 1 ? output[1] : output[0];
          const prompt = initialPredictionResponse.input.prompt;
          const imageUrl = await uploadPrediction(
            file,
            userId,
            modelId,
            predictionId,
            prompt,
            supabase
          );
          console.log("Image URL:", imageUrl);
          setFinalPrediction(imageUrl);
          setPredictionIsLoading(false);
        } else if (statusData.status === "failed") {
          clearInterval(interval);
          setPredictionError("Prediction failed");
          setPredictionIsLoading(false);
        }
      } catch (predictionError) {
        clearInterval(interval);
        setPredictionError(error.message);
        setPredictionIsLoading(false);
      }
    }, 5000); // Poll every 5 seconds
  };

  const calculateProgressFromLogs = (logs) => {
    const regex = /(\d+)%/g;
    let matches;
    let highestPercentage = 0;

    while ((matches = regex.exec(logs)) !== null) {
      const percentage = parseInt(matches[1], 10);
      highestPercentage = Math.max(highestPercentage, percentage);
    }

    if (highestPercentage > 0) {
      setPredictionProgress(highestPercentage);
    }
    return highestPercentage; // Returning highest percentage instead of logs.length
  };

  return { handleImageEditSubmit };
};
