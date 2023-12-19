import uploadPrediction from "./uploadPrediction";

export const handleImageEditSubmit = async (
  userInput,
  userInFile,
  modelId,
  setError,
  setPrediction,
  userId,
  supabase,
  setNewPrediction
) => {
  const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };
  
  try {
    const requestBody = {
      image: userInFile,
      prompt: userInput,
      version: modelId,
    };

    const response = await fetch("/api/replicate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
        // If more than 15 seconds have passed, show toast
        if (timeElapsed > 15) {
          setDelayToast("Please be patient, model is booting!");
        }
        await sleep(2500);
        const statusRequestBody = {
          id: prediction.id
        };
        const predictionResponse = await fetch(
          "/api/replicate/status", {
            method: "POST",
            body: JSON.stringify(statusRequestBody),
          }
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
      let fileUrl = output.length > 1 ? output[1] : output[0];
      const prompt = prediction.input.prompt;
      const imageUrl = await uploadPrediction(
        fileUrl,
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
    setPrediction(null); 
  }
};