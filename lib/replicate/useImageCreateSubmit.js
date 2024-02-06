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
} from "@/state/prediction-atoms";
import { exampleImageState, selectedModelIdState } from "@/state/config-atoms";
import { useUserContext } from "../UserProvider";
import uploadPrediction from "./uploadPrediction";
import { convertToDataURI } from "../convertToDataURI";

export const useImageCreateSubmit = () => {
  const modelId = useRecoilValue(selectedModelIdState);
  const userProfile = useUserContext();
  const userId = userProfile?.userProfile?.id; 

  const [modelBootResult, setModelBootResult] = useRecoilState(modelBootResultState);
  const [predictionStatus, setPredictionStatus] = useRecoilState(predictionStatusState);
  const [predictionError, setPredictionError] = useRecoilState(predictionErrorState);
  const [predictionProgress, setPredictionProgress] = useRecoilState(predictionProgressState);
  const [predictionIsLoading, setPredictionIsLoading] = useRecoilState(predictionIsloadingState);
  const [finalPrediction, setFinalPrediction] = useRecoilState(finalPredictionState);
  const [finalPredictionPrompt, setFinalPredictionPrompt] = useRecoilState(finalPredictionPromptState);

  const userImageUpload = useRecoilValue(userImageUploadState);
  const [existingUpload, setExistingUpload] = useRecoilState(existingUploadState);
  const [imageString, setImageString] = useState(null);

  const submitImageCreate = async (userInput) => {
    setPredictionError(null);
    setPredictionProgress(null);
    setModelBootResult(null);
    setFinalPrediction(null);
    setFinalPredictionPrompt(userInput);
     
    if (!userId) {
      console.error("User Login required!");
      setPredictionError("User Login required!");
      return null;
    }

    if (!userImageUpload && finalPrediction) {
      setExistingUpload(finalPrediction);
      setFinalPrediction(null);
    }
     
    let imageToUpload = existingUpload || null; // Default to existing upload if available

    if (userImageUpload) {
      try {
        // Asynchronously convert the image and then submit
        const imageUpload = await convertToDataURI(userImageUpload);
        imageToUpload = imageUpload;
      } catch (error) {
        console.error("Error converting image to Data URI:", error);
        setPredictionError("Failed to process image");
        return;
      }
    }



    const requestBody = {
      image: imageToUpload || existingUpload || null,
      prompt: userInput || null,
      version: modelId,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DEFAULT_URL}/api/replicate`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN}`,
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
        setPredictionStatus("Waiting for model to boot.");
        setModelBootResult("loading")
        break;
      case "processing":
        setPredictionStatus("Processing");
        setModelBootResult("Loaded")
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
    clearInterval(interval);

    const imageUrl = await uploadPredictionResult(
      statusData,
      initialPredictionResponse
    );
    console.log("Image URL:", imageUrl);
    if (imageUrl) {
      setFinalPrediction(imageUrl);
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

    return await uploadPrediction(
      file,
      userId,
      modelId,
      predictionId,
      prompt
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
  return submitImageCreate;
};
