import { useState, useEffect } from 'react';
import uploadPrediction from "./uploadPrediction";

export const useImageCreateSubmit = (supabase) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newPrediction, setNewPrediction] = useState(null);

  useEffect(() => {
    let source; // Declare outside so it can be cleaned up

    return () => {
      if (source) {
        source.close();
      }
    };
  }, []);

  const submitImageCreate = async (userInput, modelId, userId) => {
    setIsLoading(true);
    setError(null);
    setNewPrediction(null);

    try {
      const requestBody = {
        prompt: userInput,
        version: modelId,
        stream: true,
      };

      const response = await fetch(`http://localhost:3000/api/replicate`, {
        method: "POST",
        headers: {
          "Authorization": `Token ${process.env.NEXT_PUBLIC_REPLICATE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      let prediction = await response.json();

      if (response.status !== 201) {
        throw new Error(prediction.detail);
      }

      if (prediction.id) {
        const source = new EventSource(prediction.status);

        source.addEventListener("starting", (e) => {
          console.log("Prediction is starting");
        });
        
        source.addEventListener("processing", (e) => {
          console.log("Prediction is processing");
        });

           source.addEventListener("error", (e) => {
          setError(JSON.parse(e.data));
          source.close();
        });

        source.addEventListener("succeeded", async (e) => {
          console.log("Prediction has finished");
          source.close();
          const completedPrediction = JSON.parse(e.data);
          if (completedPrediction.status === "succeeded") {
            let output = Array.isArray(completedPrediction.output)
              ? completedPrediction.output
              : [completedPrediction.output];

            let fileUrl = output.length > 1 ? output[1] : output[0];
            const imageUrl = await uploadPrediction(
              fileUrl,
              userId,
              completedPrediction.version,
              completedPrediction.id,
              completedPrediction.input.prompt,
              supabase
            );
            setNewPrediction(imageUrl);
          } else if (completedPrediction.status === "failed") {
            setError(completedPrediction.error);
          }
        });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, submitImageCreate, newPrediction };
};
