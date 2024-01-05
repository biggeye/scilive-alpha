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
    let source; // Declare outside so it can be cleaned up

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

      let prediction = await response.json();
      
      if (response.status !== 201) {
        throw new Error(prediction.detail);
      }

      if (prediction.id) {
        // Function to poll for prediction status
        const pollPredictionStatus = async (id) => {
          const statusResponse = await fetch(`${process.env.NEXT_PUBLIC_DEFAULT_URL}/api/replicate/${prediction.id}`);
          const statusData = await statusResponse.json();
          setPredictionResult(statusData.status); // Update state with current status
  
          if (statusData.status === "succeeded") {
            // handle success
            let output = Array.isArray(prediction.output)
              ? prediction.output
              : [prediction.output];

            let fileUrl = output.length > 1 ? output[1] : output[0];
            const imageUrl = await uploadPrediction(
              fileUrl,
              userId,
              prediction.version,
              prediction.id,
              prediction.input.prompt,
              supabase
            );
            setPrediction(imageUrl);


          } else if (statusData.status === "failed") {
            setPredictionError(statusData.error);
          } else {

            setTimeout(() => pollPredictionStatus(id), 3000); // delay of 3 seconds
          }
        };
  

        pollPredictionStatus(prediction.id);
      }

            
         
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, submitImageCreate, prediction };
};
