import { useRecoilState, useRecoilValue } from "recoil";
import {
  finalPredictionState,
  finalPredictionPromptState,
  predictionStatusState,
  predictionErrorState,
  predictionResultState,
  predictionIsLoadingState,
  predictionProgressState,
  modelBootProgressState,
  modelBootResultState,
  userImageUploadState, 
} from "@/state/prediction-atoms";
import { exampleImageState, selectedModelIdState } from "@/state/config-atoms";
import { useUserContext } from "../UserProvider";
import uploadPrediction from "./uploadPrediction";

export const useImageCreateSubmit = (supabase, userInput) => {
  const modelId = useRecoilValue(selectedModelIdState);
  const userProfile = useUserContext();
  const userId = userProfile?.userProfile?.id; // Added optional chaining for safety

  const [modelBootResult, setModelBootResult] = useRecoilState(modelBootResultState);
  const [predictionStatus, setPredictionStatus] = useRecoilState(predictionStatusState);
  const [predictionError, setPredictionError] = useRecoilState(predictionErrorState);
  const [predictionResult, setPredictionResult] = useRecoilState(predictionResultState);
  const [predictionProgress, setPredictionProgress] = useRecoilState(predictionProgressState);
  const [predictionIsLoading, setPredictionIsLoading] = useRecoilState(predictionIsLoadingState);

  const [userImageUpload, setUserImageUpload] = useRecoilState(userImageUploadState);
  const [exampleImage, setExampleImage] = useRecoilState(exampleImageState);

  const [finalPrediction, setFinalPrediction] = useRecoilState(finalPredictionState);
  const [finalPredictionPrompt, setFinalPredictionPrompt] = useRecoilState(finalPredictionPromptState);

  const submitImageCreate = async (userInput) => {
  
    setPredictionIsLoading(true);

    if (!userId) {
      Alert("User Login required!");
      setPredictionIsLoading(false);  // Set loading to false if no user ID
      return null;
    }
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
        pollPredictionStatus(predictionResponse);
      }
    } catch (err) {
      setPredictionError(err.message);
    } finally {
      setPredictionProgress("25%")
      setPredictionStatus("Polling");  // Set loading to false after process completes or fails
    }
  };
  
  const pollPredictionStatus = async (initialPredictionResponse) => {
    console.log(
      "Starting to poll prediction status",
      initialPredictionResponse
    );
      setPredictionProgress("40%");
    const interval = setInterval(async () => {
      try {
        const statusData = await getStatusData(initialPredictionResponse.id);
        console.log("Status data:", statusData);

        handleStatusData(statusData, interval, initialPredictionResponse);
      } catch (error) {
        handlePredictionError(error, interval);
      }
    }, 500); // Poll aggressively until "processing"
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
        console.log("predictionStatus: starting ###################################################################");
        setPredictionStatus("Starting");
        setModelBootResult("Model is starting");
        break;
      case "processing":
        console.log("predictionStatus: PROCESSING #################################################################");
        setPredictionStatus("Processing");
        handleProcessingStatus(statusData);
        break;
      case "succeeded":
        console.log("predictionStatus: Complete #############################################################################");
        setPredictionStatus("Complete");
        setPredictionIsLoading(false);
        await handleSucceededStatus(
          statusData,
          interval,
          initialPredictionResponse
        );
        break;
      case "failed":
        handleFailedStatus(interval);
        setPredictionIsLoading(false);
        break;
    }
  };
  const handleProcessingStatus = (statusData) => {
    setModelBootResult("Model successfully loaded.");
    setPredictionStatus("Image is processing");
    setPredictionProgress(calculateProgressFromLogs(statusData.logs));
  };
  
  const handleSucceededStatus = async (
    statusData,
    interval,
    initialPredictionResponse
  ) => {
    clearInterval(interval);
    setPredictionProgress("Succeeded.")
    setPredictionResult("Processing complete.");

    const imageUrl = await uploadPredictionResult(
      statusData,
      initialPredictionResponse
    );
    console.log("Image URL:", imageUrl);

    setFinalPrediction(imageUrl);
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
    setPredictionError(error.message);
    setPredictionIsLoading(false);
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
  return submitImageCreate;
};
