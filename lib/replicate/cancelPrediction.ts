import { cancelRunningPredictionState } from "@/state/replicate/prediction-atoms";
import { useRecoilState } from "recoil";

const cancelPrediction = (cancelUrl: string) => {
    const [cancelRunningPrediction, setCancelRunningPrediction] = useRecoilState(cancelRunningPredictionState);
    const url = cancelUrl;
    setCancelRunningPrediction(url);
    return;
}
export default cancelPrediction;