// useImageCreateSubmit.js

import { useState } from 'react';
import uploadPrediction from "./uploadPrediction";

export const useImageCreateSubmit = (supabase) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newPrediction, setNewPrediction] = useState(null);

  const submitImageCreate = async (userInput, modelId) => {
    setIsLoading(true);
    setError(null);
    setNewPrediction(null);

    const sleep = (ms) => {
      return new Promise(resolve => setTimeout(resolve, ms));
    };

    try {
      const user = await supabase.auth.user();
      const requestBody = {
        prompt: userInput,
        version: modelId,
      };

      const response = await fetch(`${process.env.DEFAULT_URL}/api/replicate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      let prediction = await response.json();

      if (response.status !== 201) {
        throw new Error(prediction.detail);
      }

      const startTime = new Date();
      while (
        prediction.status !== "succeeded" &&
        prediction.status !== "failed"
      ) {
        const currentTime = new Date();
        const timeElapsed = (currentTime - startTime) / 1000; // convert to seconds

        await sleep(2500);
        const statusRequestBody = {
          id: prediction.id
        };
        const predictionResponse = await fetch(
          `${process.env.DEFAULT_URL}/api/replicate/${prediction.id}`, {
            method: "POST",
            body: JSON.stringify(statusRequestBody),
          });
        prediction = await predictionResponse.json();
        if (predictionResponse.status !== 200) {
          setError(prediction.detail);
          return;
        }
      }
      if (prediction.status === "succeeded") {
        const predictionId = prediction.id;
        const modelId = prediction.version;
        let output = Array.isArray(prediction.output)
          ? prediction.output
          : [prediction.output];

        let fileUrl = output.length > 1 ? output[1] : output[0];
        const prompt = prediction.input.prompt;
        const imageUrl = await uploadPrediction(
          fileUrl,
          user.id,
          modelId,
          predictionId,
          prompt,
          supabase
        );
        setNewPrediction(imageUrl);
      } else if (prediction.status === "failed") {
        setError(prediction.error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, submitImageCreate, newPrediction };
};
