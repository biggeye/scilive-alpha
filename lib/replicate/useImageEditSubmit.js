import { useRecoilState, useRecoilValue } from "recoil";
import {
  predictionErrorState,
  predictionResultState,
  predictionIsLoadingState,
  finalPredictionState,
  finalPredictionPromptState,
  predictionProgressState,
  userImageUploadState,
  userImageDataUriState,
  modelBootProgressState,
  modelBootResultState,
} from "@/state/prediction-atoms";
import { selectedModelIdState } from "@/state/config-atoms";
import { useUserContext } from "../UserProvider";
import uploadPrediction from "./uploadPrediction";

export const useImageEditSubmit = (supabase, userInput) => {
  const modelId = useRecoilValue(selectedModelIdState);
  const userProfile = useUserContext();
  const userId = userProfile?.userProfile?.id; // Added optional chaining for safety

  const [modelBootResult, setModelBootResult] = useRecoilState(modelBootResultState);
  const [modelBootProgress, setModelBootProgress] = useRecoilState(modelBootProgressState);

  const [predictionIsLoading, setPredictionIsLoading] = useRecoilState(predictionIsLoadingState);
  const [predictionError, setPredictionError] = useRecoilState(predictionErrorState);
  const [predictionResult, setPredictionResult] = useRecoilState(predictionResultState);
  const [predictionProgress, setPredictionProgress] = useRecoilState(predictionProgressState);
  const [finalPrediction, setFinalPrediction] = useRecoilState(finalPredictionState);
  const [finalPredictionPrompt, setFinalPredictionPrompt] = useRecoilState(finalPredictionPromptState);
  
  const userImageUpload = useRecoilValue(userImageDataUriState);
  const setUserImageUpload = useRecoilState(userImageUploadState);
  
  const imageEditSubmit = async (userInput) => {
    setPredictionIsLoading(true);
    setPredictionError(null);
    setFinalPrediction(null);
    setFinalPredictionPrompt(userInput);

    if (!userImageUpload) {
      console.log("No image found, please upload and try again");
      return null;
    }

    const requestBody = {
      image: userImageUpload,
      prompt: userInput,
      version: modelId,
    };
    console.log("requestBody: ", requestBody);
    setFinalPredictionPrompt(requestBody.prompt);
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
      setPredictionError(err.message);
    }
  };

  const pollPredictionStatus = async (initialPredictionResponse) => {
    console.log(
      "Starting to poll prediction status",
      initialPredictionResponse
    );
    setModelBootResult("Model is booting, please be patient");
      setPredictionProgress("25%");
    const interval = setInterval(async () => {
      try {
        const statusData = await getStatusData(initialPredictionResponse.id);
        console.log("Status data:", statusData);

        handleStatusData(statusData, interval, initialPredictionResponse);
      } catch (error) {
        handlePredictionError(error, interval);
      }
    }, 1000); // Poll every  second
  };
  const getStatusData = async (id) => {
    const statusResponse = await fetch(
      `${process.env.NEXT_PUBLIC_DEFAULT_URL}/api/replicate/status`,
      {
        method: "POST",
        headers: {
          Authorization: `Token ${process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN}`,
        },
        body: JSON.stringify({ id }),
      }
    );
    return await statusResponse.json();
  };
  const handleStatusData = async (
    statusData,
    interval,
    initialPredictionResponse
  ) => {
    switch (statusData.status) {
      case "starting":
        setModelBootResult("Model is starting");
        break;
      case "processing":
        handleProcessingStatus(statusData);
        break;
      case "succeeded":
        await handleSucceededStatus(
          statusData,
          interval,
          initialPredictionResponse
        );
        break;
      case "failed":
        handleFailedStatus(interval);
        break;
    }
  };
  const handleProcessingStatus = (statusData) => {
    setModelBootResult("Model successfully loaded.");
    setPredictionResult("Image is processing");
      setPredictionProgress(calculateProgressFromLogs(statusData.logs));
  };
  const handleSucceededStatus = async (
    statusData,
    interval,
    initialPredictionResponse
  ) => {
    clearInterval(interval);
    setPredictionResult("Processing complete.");


const imageUrl = await uploadPredictionResult(
  statusData,
  initialPredictionResponse
);
console.log("Image URL:", imageUrl);

setFinalPrediction(imageUrl);
setUserImageUpload(imageUrl);
setPredictionIsLoading(false);
};

  const uploadPredictionResult = async (
    statusData,
    initialPredictionResponse
  ) => {
    const predictionId = statusData.id;
    const modelId = statusData.version;
    let output = Array.isArray(statusData.output)
      ? statusData.output
      : [statusData.output];
    let file = output.length > 1 ? output[1] : output[0];
    const prompt = initialPredictionResponse.input.prompt;
        
    return await uploadPrediction(
      file,
      userId,
      modelId,
      predictionId,
      prompt,
      supabase
    );
  };
  const handleFailedStatus = (interval) => {
    clearInterval(interval);
    setPredictionError("Prediction failed");
    setPredictionIsLoading(false);
  };
  const handlePredictionError = (error, interval) => {
    clearInterval(interval);
    setPredictionIsLoading(false);
    setPredictionError(error.message);
  };
  const calculateProgressFromLogs = (logs) => {
    const regex = /(\d+)%/g;
    let matches;
    let highestPercentage = 0;

    while ((matches = regex.exec(logs)) !== null) {
      const percentage = parseInt(matches[1], 10);
      highestPercentage = Math.max(highestPercentage, percentage);
    }

    // Scale the percentage to the range of 25% to 100%
    highestPercentage = 25 + highestPercentage * 0.75;

    if (highestPercentage > 0) {
      setPredictionProgress(highestPercentage);
    }
    return highestPercentage; // Returning highest percentage instead of logs.length
  };

  return imageEditSubmit;
};
