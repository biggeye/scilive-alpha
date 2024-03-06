'use client'
import { useRecoilState } from "recoil";
import { predictionStatusState, predictionProgressState, modelBootResultState } from "@/state/replicate/prediction-atoms";

const UpdateProgress = (logs: string) => {
    const [predictionProgress, setPredictionProgress] = useRecoilState(predictionProgressState);
    const [predictionStatus, setPredictionStatus] = useRecoilState(predictionStatusState);
    const [modelBootResult, setModelBootResult] = useRecoilState(modelBootResultState);

    const incomingProgress = logs;
    
    if (incomingProgress==="0%") {
      setPredictionStatus("starting");
      setModelBootResult("Model is loading")
    }
    
    const regex = /(\d+)%/g;
    let matches;
    let highestPercentage = 0;

    while ((matches = regex.exec(logs)) !== null) {
      const percentage = parseInt(matches[1], 10);
      highestPercentage = Math.max(highestPercentage, percentage);
    }

    // Scale the percentage to the range of 25% to 100%
    if (highestPercentage > 0) {
      setPredictionProgress(highestPercentage);
      setModelBootResult("Model is loaded")
      setPredictionStatus("processing");
    }
    return highestPercentage; // Returning highest percentage instead of logs.length
  };

  export default UpdateProgress;