import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useUserContext } from "../user/UserProvider";
import uploadPrediction from "./uploadPrediction";
import { convertToDataURI } from "../convertToDataURI";
import {
  predictionErrorState,
  finalPredictionState,
  finalPredictionPromptState,
  userImageDataUriState,
  modelBootResultState,
  existingUploadState,
  userImageUploadState
} from "@/state/replicate/prediction-atoms";
import { selectedModelIdState } from "@/state/replicate/config-atoms";


export const useImageCreateSubmit = () => {
  const [modelBootResult, setModelBootResult] = useRecoilState(modelBootResultState);
  const [predictionError, setPredictionError] = useRecoilState(predictionErrorState);
  const [finalPrediction, setFinalPrediction] = useRecoilState(finalPredictionState);
  const [finalPredictionPrompt, setFinalPredictionPrompt] = useRecoilState(finalPredictionPromptState);
  const userImageUpload = useRecoilValue(userImageUploadState);
  const [existingUpload, setExistingUpload] = useRecoilState(existingUploadState);
  const userImageUri = useRecoilValue(userImageDataUriState);
  const modelId = useRecoilValue(selectedModelIdState);
  const userProfile = useUserContext();
  const userId = userProfile?.userProfile?.id;

  const submitImageCreate = async (userInput) => {
    setPredictionError(null);
    setModelBootResult(null);
    setFinalPrediction(null);
    setFinalPredictionPrompt(userInput);
    if (!userId) {
      console.error("User Login required!");
      setPredictionError("User Login required!");
      return null;
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

    const requestBody = {
      user_id: userId,
      version: modelId,
      input_images: userImageUri || imageToUpload || existingUpload || null,
      prompt: userInput || null,
    };
 console.log("useImageCreateSubmit, requestBody: ", requestBody);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_DEFAULT_URL}/api/replicate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
    
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else if (response.headers.get("Content-Type")?.includes("application/json")) {
        const predictionResponse = await response.json();
        if (predictionResponse.id) {
          return predictionResponse.id;
        } else {
          throw new Error(predictionResponse.detail || "Unknown error");
        }
      } else {
        throw new Error("Response not JSON");
      }
    } catch (err) {
      console.error("Error in submitImageCreate:", err);
      setPredictionError(err.message);
    }
    
  };

  return submitImageCreate;
};