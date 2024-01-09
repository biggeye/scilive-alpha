  import { useState, useEffect } from "react";
  import uploadPrediction from "./uploadPrediction";
  import {
    predictionState,
    predictionErrorState,
    predictionResultState,
    predictionIdState,
    finalPredictionState
  } from "@/state/prediction-atoms";
  import { useRecoilState } from "recoil";
  import { predictionProgressState } from "@/state/prediction-atoms";
  import { useUserContext } from "../UserProvider";

  export const useImageCreateSubmit = (supabase) => {
  // local state
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

  // global state
    const { userProfile } = useUserContext();
    const [prediction, setPrediction] = useRecoilState(predictionState);
    const [predictionError, setPredictionError] = useRecoilState(predictionErrorState);
    const [predictionResult, setPredictionResult] = useRecoilState(predictionResultState);
    const [predictionProgress, setPredictionProgress] = useRecoilState(predictionProgressState);
    const [predictionId, setPredictionId] = useRecoilState(predictionIdState);
    const [finalPrediction, setFinalPrediction] = useRecoilState(finalPredictionState);
    const userId = userProfile.id;

    useEffect(() => {
      let source;
      return () => {
        if (source) {
          source.close();
        }
      };
    }, []);

    useEffect(() => {
      return () => {
        setPredictionError(null);
        setPredictionProgress(null);
        setPredictionResult(null);
        setPredictionId(null);
        setFinalPrediction(null);
      };
    }, []);

    const submitImageCreate = async (userInput, modelId, userId) => {
      setIsLoading(true);
      setPrediction(null);
      setPredictionError(null);
      setFinalPrediction(null);
      setPredictionResult(userInput);
      try {
        const requestBody = {
          prompt: userInput,
          version: modelId,
          stream: true,
        };

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_DEFAULT_URL}/api/replicate`,
          {
            method: "POST",
            headers: {
              Authorization: `Token ${process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          }
        );

        let predictionResponse = await response.json();

        if (response.status !== 201) {
          throw new Error(predictionResponse.detail);
        }

        if (predictionResponse.id) {
          pollPredictionStatus(predictionResponse);
          setPredictionId(predictionResponse.id);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    const pollPredictionStatus = async (predictionResponse) => {
      try {
        const predictionId = predictionResponse.id;
        console.log("predictionId: ", predictionId);
        console.log("prediction: ", prediction);
        if (predictionResponse.status === "starting") {
        setPredictionProgress("Model is loading...")
        setPredictionResult("This may take a few minutes...")
        }
        const statusResponse = await fetch(
          `${process.env.NEXT_PUBLIC_DEFAULT_URL}/api/replicate/status`,
          {
            method: "POST",
            headers: {
              Authorization: `Token ${process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: predictionId }), // Correctly stringify the body
          }
        );

        if (!statusResponse.ok) {
          throw new Error(`HTTP error! status: ${statusResponse.status}`);
        }

        const statusData = await statusResponse.json();

        // Check if logs are defined and is a string
        if (statusData.logs && typeof statusData.logs === "string") {
          const logLines = statusData.logs.split("\n");
          const lastLine = logLines[logLines.length - 2];
          const progressMatch = lastLine.match(/(\d+)%/);
          const progressPercentage = progressMatch
            ? parseInt(progressMatch[1])
            : null;
          if (progressPercentage !== null) {
            setPredictionProgress(progressPercentage);
            setPredictionResult(`Processing: ${progressPercentage}%`);
          } else {
            setPredictionProgress(25);
            setPredictionResult("Processing...");
          }
        }

        if (statusData.status === "succeeded") {
          const modelId = statusData.version;

          let output = Array.isArray(statusData.output)
            ? statusData.output
            : [statusData.output];

          let fileUrl = output.length > 1 ? output[1] : output[0];
          const prompt = statusData.input.prompt;
          const imageUrl = await uploadPrediction(
            fileUrl,
            userId,
            modelId,
            predictionId,
            prompt,
            supabase
          );
          setFinalPrediction(imageUrl);
        } else if (statusData.status === "failed") {
          setPredictionError(statusData.error);
        } else {
          setTimeout(() => pollPredictionStatus(predictionResponse), 3000);
        }
      } catch (err) {
        setError(`Error while polling prediction status: ${err.message}`);
      } 

      }
    }
    if (finalPrediction) {
      setIsLoading(false);
      setPredictionProgress(null);
      setPredictionResult(null);
      setPredictionId(null);
      setPrediction(null);
    };

    return { isLoading, error, submitImageCreate, finalPrediction };

