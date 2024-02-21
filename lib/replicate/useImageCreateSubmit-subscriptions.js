// useImageCreateSubmit.js

'use client';
import { useRecoilState, useRecoilValue } from "recoil";
import {
  finalPredictionState,
  finalPredictionPromptState,
  predictionStatusState,
  predictionErrorState,
  predictionProgressState,
} from "@/state/replicate/prediction-atoms";
import { selectedModelIdState } from "@/state/replicate/config-atoms";
import { useUserContext } from "../user/UserProvider";
import useSubscribeToPredictionUpdates from './useSubscribeToPredictionUpdates'; // Import the subscription hook

export const useImageCreateSubmit = () => {
  const modelId = useRecoilValue(selectedModelIdState);
  const { userProfile } = useUserContext();
  const userId = userProfile?.id;

  // Recoil state setters for states not directly updated by the subscription
  const [finalPredictionPrompt, setFinalPredictionPrompt] = useRecoilState(finalPredictionPromptState);
  const [predictionError, setPredictionError] = useRecoilState(predictionErrorState);

  // Utilize the subscription hook to listen to prediction updates
  useSubscribeToPredictionUpdates(userId);

  const submitImageCreate = async (userInput) => {
    if (!userId) {
      console.error("User Login required!");
      setPredictionError("User Login required!");
      return null;
    }

    setFinalPredictionPrompt(userInput);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DEFAULT_URL}/api/replicate`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: userInput,
            version: modelId,
          }),
        }
      );

      const predictionResponse = await response.json();
      if (response.status !== 201) {
        throw new Error(predictionResponse.detail || "Unknown error");
      }

      // No further action needed here; updates will be handled by the subscription hook
    } catch (err) {
      console.error("Error in submitImageCreate:", err);
      setPredictionError(err.message);
    }
  };

  return submitImageCreate;
};
