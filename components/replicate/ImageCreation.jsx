'use client'

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import ModelSelect from "./ModelSelect";
import { txt2img } from "@/data/replicate/txt2img";
import uploadPrediction from "@/utils/replicate/uploadPrediction";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const ImageCreation = () => {
  // ******STATE
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [predictionProgress, setPredictionProgress] = useState(0);
  const [delayToast, setDelayToast] = useState(null);
  const [error, setError] = useState(null);
  // Prediction preparation
  const [userInput, setUserInput] = useState("");
  const [negativeUserInput, setNegativeUserInput] = useState("");
  const [selectedModel, setSelectedModel] = useState({
    modelId: "601eea49d49003e6ea75a11527209c4f510a93e2112c969d548fbb45b9c4f19f",
    friendlyName: "Kandinsky-2",
    shortDesc:
      "text2img model trained on LAION HighRes and fine-tuned on internal datasets",
    example:
      "https://replicate.delivery/pbxt/2ReXGPtHrE1xe09lakZGFNY6FSdXUOPfSNkw2PAIXAAJ0mdhA/out.png",
  });
  // Prediction production
  const [prediction, setPrediction] = useState(null);
  const [newPrediction, setNewPrediction] = useState(null);

  // *****VARIABLES
  const user = useUser();
  const supabase = useSupabaseClient();
  const userId = user.id;
  const toast = useToast();

  const sortedTxt2Img = [...txt2img].sort((a, b) =>
  a.friendlyName.localeCompare(b.friendlyName, 'en', { sensitivity: 'base' })
);

  const handleUserInputChange = (e) => {
    setUserInput(e.target.value);
  };
  const handleModelChange = (modelId, friendlyName, shortDesc, example) => {
    setSelectedModel({ modelId, friendlyName, shortDesc, example });
    if (newPrediction) {
      handleImageReset();
    }
  };
  const handleUserInputSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const requestBody = {
        prompt: userInput,
        negative_prompt: negativeUserInput,
        version: selectedModel.modelId,
      };

      const response = await fetch("api/replicate", {
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

      setPrediction(prediction);
      const startTime = new Date();
      while (
        prediction.status !== "succeeded" &&
        prediction.status !== "failed"
      ) {
        const currentTime = new Date();
        const timeElapsed = (currentTime - startTime) / 1000; // convert to seconds

        // If more than 15 seconds have passed, show toast
        if (timeElapsed > 12) {
          setDelayToast("Please be patient, model is booting!");
        }

        await sleep(2500);
        const predictionResponse = await fetch(
          "/api/replicate/" + prediction.id
        );
        prediction = await predictionResponse.json();
        if (predictionResponse.status !== 200) {
          setError(prediction.detail);
          return;
        }
        const logs = prediction.logs;
        const regex = /(\d+)%/g;
        let matches;
        let highestPercentage = 0;

        while ((matches = regex.exec(logs)) !== null) {
          const percentage = parseInt(matches[1], 10);
          highestPercentage = Math.max(highestPercentage, percentage);
        }

        if (highestPercentage > 0) {
          setPredictionProgress(highestPercentage);
        }
        setPrediction(prediction);
      }
      if (prediction.status === "succeeded") {
        const predictionId = prediction.id;
        const modelId = prediction.version;
        // Make sure output is always an array
        let output = Array.isArray(prediction.output)
          ? prediction.output
          : [prediction.output];

        // If there is a second element in the array, use it as the file. Otherwise, use the first element.
        let file = output.length > 1 ? output[1] : output[0];
        const prompt = prediction.input.prompt;
        const imageUrl = await uploadPrediction(
          file,
          userId,
          modelId,
          predictionId,
          prompt,
          supabase
        );
        setNewPrediction(imageUrl);
      } else if (prediction.status === "failed") {
        console.log(prediction.error);
        setError(prediction.error);
      }
    } finally {
      setIsLoading(false);
      setUserInput("");
      setPrediction(null);
    }
  };
  const handleImageReset = (newPrediction) => {
    toast.closeAll();
    toast({
      title: "Image stored in EyeGallery",
      description: "Your image is stored in EyeGallery",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    setNewPrediction(null);
  };
  
    return (
    <div className="bg-gradient-to-b from-white via-gray-200 to-white text-sm md:text-md lg:text-lg xl:text-xl flex flex-col items-center justify-center overflow-y-auto">
      <div className="flex flex-col w-full">
        <div className="input-group">
          <input
            className="text-black p-2"
            name="prompt"
            placeholder="Describe your image here"
            value={userInput}
            onChange={handleUserInputChange}
          />
          <span className="input-group-append">
            <button
              className={`p-2 ${isLoading ? 'loading' : ''}`}
              onClick={handleUserInputSubmit}
            >
              submit
            </button>
          </span>
        </div>

        <div className="w-80vw mx-auto text-center">
          <ModelSelect
            handleModelChange={handleModelChange}
            models={sortedTxt2Img}
          />
          {isLoading ? (
            prediction && (
              <div>
                {/* Implement CircularProgress equivalent in Tailwind */}
                <p>{prediction.status}</p>
              </div>
            )
          ) : (
            <div className="mx-auto rounded-lg shadow-md bg-white dark:bg-gray-800 max-w-2xl">
              {newPrediction ? (
                <img
                  className="rounded-t-lg w-full h-50vh object-cover"
                  src={newPrediction}
                  alt="Article"
                  onClick={handleImageReset}
                />
              ) : (
                <img
                  className="rounded-t-lg w-full h-50vh object-cover"
                  src={selectedModel.example}
                  alt="Article"
                />
              )}

              <div className="p-6">
                <div>
                  <span className="text-xs uppercase text-brand-600 dark:text-brand-400">
                    txt2img
                  </span>
                  <p className="block text-gray-800 dark:text-white font-bold text-2xl mt-2 hover:text-gray-600 hover:underline">
                    {selectedModel.friendlyName}
                  </p>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {selectedModel.shortDesc}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="text-sm md:text-md lg:text-lg xl:text-xl p-1 md:p-2 fixed bottom-0 w-full opacity-90 backdrop-blur-md">
        {/* Footer content */}
      </div>
    </div>
  );
};

export default ImageCreation;