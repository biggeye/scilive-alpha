'use client'
import { useRecoilState } from "recoil";
import { predictionProgressState } from "@/state/replicate/prediction-atoms";

const calculateProgressFromLogs = (logs: string) => {
    const [predictionProgress, setPredictionProgress] = useRecoilState(predictionProgressState);

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
    }
    return highestPercentage; // Returning highest percentage instead of logs.length
  };