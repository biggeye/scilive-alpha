import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useUserContext } from "../user/UserProvider";
import { uploadPrediction } from "./uploadPrediction"; // Ensure this is correctly typed in its own file
import { convertToDataURI } from "../../utils/convertToDataURI";
import {
  predictionErrorState,
  finalPredictionState,
  finalPredictionPromptState,
  userImageDataUriState,
  modelBootResultState,
  userImageUploadState,
} from "@/state/replicate/prediction-atoms";
import { selectedModelIdState } from "@/state/replicate/config-atoms";
import { UserProfile } from "@/types";
import { buildRequestBody } from './requestBodyBuilder';
import { fetchPrediction } from './fetchPrediction';

export const useImageCreateSubmit = () => {
  const modelId = useRecoilValue<string>(selectedModelIdState);
  const userImageUpload = useRecoilValue<File | null>(userImageUploadState);
  const userImageUri = useRecoilValue<string | null>(userImageDataUriState);
  const [modelBootResult, setModelBootResult] = useRecoilState<string | null>(modelBootResultState);
  const [predictionError, setPredictionError] = useRecoilState<string | null>(predictionErrorState);
  const [finalPrediction, setFinalPrediction] = useRecoilState<string | null>(finalPredictionState);
  const [finalPredictionPrompt, setFinalPredictionPrompt] = useRecoilState<string | null>(finalPredictionPromptState);
  const userProfile = useUserContext();
  const userId = userProfile?.userProfile?.id;

  const submitImageCreate = async (userInput: string): Promise<string | null> => {
    setPredictionError(null);
    setModelBootResult(null);
    setFinalPrediction(null);
    setFinalPredictionPrompt(userInput);

    if (!userId) {
      console.error("User Login required!");
      setPredictionError("User Login required!");
      return null;
    }

    if (userImageUpload) {
      try {
        const imageUpload: string = await convertToDataURI(userImageUpload);
      } catch (error) {
        console.error("Error converting image to Data URI:", error);
        setPredictionError("Failed to process image");
        return null;
      }
    }

    const requestBody = buildRequestBody(userId, modelId, userImageUri, userInput);
    
    console.log("useImageCreateSubmit, requestBody: ", requestBody);
    try {
      const predictionId = await fetchPrediction(requestBody);
      return predictionId;
    } catch (err) {
      console.error("An unexpected error occurred");
      setPredictionError("An unexpected error occurred");
    }
    return null;
  };

  return submitImageCreate;
};