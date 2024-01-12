import { useState, useEffect } from "react";
import uploadPrediction from "./uploadPrediction";
import {
  modelBootProgressState,
  modelBootResultState,
  predictionStatusState,
  predictionErrorState,
  predictionProgressState,
  predictionResultState,
  finalPredictionState,
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
  const [modelBootProgress, setModelBootProgress] = useRecoilState(
    modelBootProgressState
  );
  const [modelBootResult, setModelBootResult] =
    useRecoilState(modelBootResultState);
   const [predictionStatus, setPredictionStatus] = useRecoilState(
    predictionStatusState
  );
  const [predictionError, setPredictionError] =
    useRecoilState(predictionErrorState);
  const [predictionProgress, setPredictionProgress] = useRecoilState(
    predictionProgressState
  );
  const [predictionResult, setPredictionResult] = useRecoilState(
    predictionResultState
  );

  const [finalPrediction, setFinalPrediction] =
    useRecoilState(finalPredictionState);

  const submitImageCreate = async (userInput, userId, modelId) => {
    setIsLoading(true);
    setPredictionStatus(null);
    setPredictionError(null);
    setFinalPrediction(null);

    const requestBody = {
      prompt: userInput,
      version: modelId,
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
        throw new Error(predictionResponse.detail || "Unknown error");
      }
      if (predictionResponse.id) {
        pollPredictionStatus(predictionResponse, userId);
      }
    } catch (err) {
      console.error("Error in submitImageCreate", err.message);
      setError(err.message);
    } finally {
      console.log(
        "prediction submitted to Replicate server"
      );
    }
  };

  const pollPredictionStatus = async (predictionResponse, user) => {
    const predictionId = predictionResponse.id;
    try {
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

      if (statusResponse.status === "starting") {
        setPredictionStatus("starting");
        console.log(predictionStatus);
        setPredictionProgress(1);
        let timer = 180; // 3 minutes in seconds
        let progress = 0;

        const interval = setInterval(() => {
          timer--;
          progress = ((180 - timer) / 180) * 100; // calculate progress percentage
          setModelBootProgress(progress);
          setModelBootResult("Model is booting, please be patient.");
          // Check if the status has changed
          if (statusResponse.status !== "starting") {
            clearInterval(interval);
            setModelBootProgress(100);
            setModelBootResult("Model successfully booted.");
            setPredictionStatus(predictionResponse.status);
          }

          if (timer === 0) {
            clearInterval(interval);

            // Check if the status is still "starting"
            if (statusResponse.status === "starting") {
              setModelBootResult(
                "Model is taking an extremely long time to boot."
              );
            } else {
              setModelBootResult("Model booting is complete.");
            }
          } else {
            setModelBootResult(
              `Model is booting, this may take a few more seconds. Progress: ${progress.toFixed(
                2
              )}%`
            );
          }
        }, 1000);
      }

      const statusData = await statusResponse.json();
      if (!statusResponse.ok) {
        setPredictionError(error);
        console.error(
          "HTTP error in pollPredictionStatus",
          statusResponse.status
        );
        throw new Error(`HTTP error! status: ${statusResponse.status}`);
      }
      setPredictionStatus(statusData.status);
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
      setPredictionError(
        `Error while polling prediction status: ${err.message}`
      );
    }
  };
  const handleSuccess = async (statusData) => {
    const output = Array.isArray(statusData.output)
      ? statusData.output.flat()
      : [statusData.output];
    const uploadedImages = await Promise.all(
      output.map((fileUrl) =>
        uploadPrediction(
          fileUrl,
          userId,
          statusData.version,
          statusData.id,
          statusData.input.prompt,
          supabase
        )
      )
    );
    setFinalPrediction(uploadedImages[uploadedImages.length - 1]); // Set the last image URL
    if (finalPrediction) {
      setModelBootProgress(null);
      setModelBootResult(null);
      setIsLoading(false);
      setPredictionProgress(null);
      setPredictionResult(null);
      setPredictionStatus("succeeded");
      setError(null);
    }
  };
  return {
    isLoading, // Make sure isLoading is defined and updated in the hook
    error, // And other relevant states and functions
    submitImageCreate,
  };
};
