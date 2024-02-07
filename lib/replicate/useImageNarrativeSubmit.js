import { useState } from "react";
import { finalNarrativePredictionState, userImageDataUriState, imageNarrativePromptState } from "@/state/prediction-atoms";
import { selectedModelIdState } from "@/state/config-atoms";
import { useRecoilValue, useRecoilState } from "recoil";

export const useImageNarrativeSubmit = () => {
  const [predictionIsLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [displayedResponse, setDisplayedResponse] = useState("");
  const userImageDataUri = useRecoilValue(userImageDataUriState);
  const [finalNarrativePrediction, setFinalNarrativePrediction] = useRecoilState(finalNarrativePredictionState);
  const modelId = useRecoilValue(selectedModelIdState);

  const submitImageNarrative = async (userInput) => {
    setIsLoading(true);

    const requestBody = {
      image: userImageDataUri || existingUpload || null,
      prompt: userInput || null,
      version: modelId,
  }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_DEFAULT_URL}/api/replicate`, {
          method: 'POST',
          body: requestBody,
      });
       
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      const result = await response.json();
       setFinalNarrativePrediction(result.output);
       
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return submitImageNarrative;
}
