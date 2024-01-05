import { useState, useEffect } from 'react';
import uploadPrediction from "./uploadPrediction";
import { useRecoilState } from 'recoil';
import { predictionState, predictionErrorState, predictionResultState } from '@/state/prediction-atoms';

export const useImageCreateSubmit = (supabase) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [prediction, setPrediction] = useRecoilState(predictionState);
  const [predictionError, setPredictionError] = useRecoilState(predictionErrorState);
  const [predictionResult, setPredictionResult] = useRecoilState(predictionResultState);

  useEffect(() => {
    let source;
    return () => {
      if (source) {
        source.close();
      }
    };
  }, []);

  const submitImageCreate = async (userInput, modelId, userId) => {
    setIsLoading(true);
    setPrediction(null);
    setPredictionError(null);
    setPredictionResult(userInput);

    try {
      const requestBody = {
        prompt: userInput,
        version: modelId,
        stream: true,
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_DEFAULT_URL}/api/replicate`, {
        method: "POST",
        headers: {
          "Authorization": `Token ${process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      let predictionResponse = await response.json();

      if (response.status !== 201) {
        throw new Error(predictionResponse.detail);
      }

      if (predictionResponse.id) {
        pollPredictionStatus(predictionResponse.id);
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const pollPredictionStatus = async (id) => {
    try {
      const statusResponse = await fetch(`https://api.replicate.com/v1/predictions/${id}`, {
      headers: {
        'Authorization': `Token ${process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json',
      }});
      const statusData = await statusResponse.json();

      // Extract progress percentage from logs
      const logLines = statusData.logs.split('\n');
      const lastLine = logLines[logLines.length - 2]; // The second last line contains the latest progress
      const progressMatch = lastLine.match(/(\d+)%/);
      const progressPercentage = progressMatch ? parseInt(progressMatch[1]) : 0;
      // Update state with progress percentage
      setPredictionResult(`Processing: ${progressPercentage}%`);

      if (statusData.status === "succeeded") {
        let output = Array.isArray(statusData.output) ? statusData.output : [statusData.output];
        let fileUrl = output.length > 1 ? output[1] : output[0];
        const imageUrl = await uploadPrediction(
          fileUrl,
          userId,
          statusData.version,
          statusData.id,
          statusData.input.prompt,
          supabase
        );
        setPrediction(imageUrl);
      } else if (statusData.status === "failed") {
        setPredictionError(statusData.error);
      } else {
        setTimeout(() => pollPredictionStatus(id), 3000); // Poll every 3 seconds
      }
    } catch (err) {
      setError(`Error while polling prediction status: ${err.message}`);
    }
  };

  return { isLoading, error, submitImageCreate, prediction };
};
