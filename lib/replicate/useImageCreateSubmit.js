import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  predictionErrorState,
  finalPredictionState,
  finalPredictionPromptState,
  predictionStatusState,
  predictionProgressState,
  existingUploadState,
  userImageUploadState,
  userImageDataUriState,
  modelBootResultState,
  predictionIsLoadingState,
  finalNarrativeState,
  globalLoadingState
} from "@/state/replicate/prediction-atoms";
import {
  exampleImageState,
  selectedModelIdState,
} from "@/state/replicate/config-atoms";
import { useUserContext } from "../user/UserProvider";
import uploadPrediction from "./uploadPrediction";
import { convertToDataURI } from "../convertToDataURI";

export const useImageCreateSubmit = () => {
  const modelId = useRecoilValue(selectedModelIdState);
  const userProfile = useUserContext();
  const userId = userProfile?.userProfile?.id;
  const userImageUri = useRecoilValue(userImageDataUriState);
  const [modelBootResult, setModelBootResult] =
    useRecoilState(modelBootResultState);
  const [predictionStatus, setPredictionStatus] = useRecoilState(predictionStatusState);
  const [predictionError, setPredictionError] = useRecoilState(predictionErrorState);
  const [predictionProgress, setPredictionProgress] = useRecoilState(predictionProgressState);
  const [predictionIsLoading, setPredictionIsLoading] = useRecoilState(predictionIsLoadingState);
  const [finalPrediction, setFinalPrediction] = useRecoilState(finalPredictionState);
  const [finalPredictionPrompt, setFinalPredictionPrompt] = useRecoilState(finalPredictionPromptState);
  const [finalNarrative, setFinalNarrative] = useRecoilState(finalNarrativeState);
  const userImageUpload = useRecoilValue(userImageUploadState);
  const [existingUpload, setExistingUpload] = useRecoilState(existingUploadState);
  const [imageString, setImageString] = useState(null);
  const [globalLoading, setGlobalLoading] = useRecoilState(globalLoadingState)(false);

  const submitImageCreate = async (userInput) => {
    setPredictionError(null);
    setPredictionProgress(null);
    setModelBootResult(null);
    setFinalPrediction(null);
    setFinalPredictionPrompt(userInput);



    function isValidHttpUrl(string) {
      let url;

      try {
        url = new URL(string);
      } catch (_) {
        return false;
      }

      return url.protocol === "http:" || url.protocol === "https:";
    }

    if (!userId) {
      console.error("User Login required!");
      setPredictionError("User Login required!");
      return null;
    }

    if (!userImageUpload && finalPrediction) {
      setExistingUpload(finalPrediction);
      setFinalPrediction(null);
    }

    let imageToUpload = existingUpload || null;

    if (userImageUpload) {
      try {
        const imageUpload = await convertToDataURI(userImageUpload);
        imageToUpload = imageUpload;
      } catch (error) {
        console.error("Error converting image to Data URI:", error);
        setPredictionError("Failed to process image");
        return;
      }
    }

    // Adjust requestBody to focus on image handling
    const requestBody = {
      image: userImageUri || imageToUpload || existingUpload || null,
      prompt: userInput || null,
      version: modelId,
    };
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DEFAULT_URL}/api/replicate`,
        {
          method: "POST",
          headers: {
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
        setGlobalLoading(false);
       return(predictionResponse.id);

      }
    } catch (err) {
      console.error("Error in submitImageCreate:", err);
      setPredictionError(err.message);
    }
  };
/*
  const handleStatusData = async (
    statusData,
    interval,
    initialPredictionResponse
  ) => {
    switch (statusData.status) {
      case "starting":
        setPredictionStatus("Waiting for model to boot.");
        setModelBootResult("loading");
        break;
      case "processing":
        setPredictionStatus("Processing");
        setModelBootResult("Loaded");
        handleProcessingStatus(statusData);
        break;
      case "succeeded":
        setPredictionIsLoading(false);
        setPredictionStatus("Complete");
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
    setPredictionProgress(calculateProgressFromLogs(statusData.logs));
  };

  const handleSucceededStatus = async (
    statusData,
    interval,
    initialPredictionResponse
  ) => {
    function isValidHttpUrl(string) {
      let url;

      try {
        url = new URL(string);
      } catch (_) {
        return false;
      }

      return url.protocol === "http:" || url.protocol === "https:";
    }
    clearInterval(interval);

    // Process the output to determine if it's an image URL or a text message
    const result = await uploadPredictionResult(
      statusData,
      initialPredictionResponse
    );

    // Use the isValidHttpUrl function to check if the result is a URL
    if (isValidHttpUrl(result)) {
      console.log("Image URL:", result);
      setFinalPrediction(result); // If it's a URL, proceed as before
    } else {
      console.log("Result string:", result);
      setFinalNarrative(result); // If it's a string (text message), set it to a new or existing state
      setFinalPrediction(null); // Ensure finalPrediction is cleared if it's not a URL
    }
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
    const contentType = "image";
    return await uploadPrediction(
      file,
      userId,
      modelId,
      predictionId,
      prompt,
      contentType
    );

  };

  const handleFailedStatus = (interval) => {
    clearInterval(interval);
    setPredictionError("Prediction failed");
  };
  const handlePredictionError = (error, interval) => {
    clearInterval(interval);
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
    if (highestPercentage > 0) {
      setPredictionProgress(highestPercentage);
    }
    return highestPercentage; // Returning highest percentage instead of logs.length
  };
*/
  return submitImageCreate;
};
