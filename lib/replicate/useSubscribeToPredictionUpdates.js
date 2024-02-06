import { useEffect, useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { predictionStatusState, finalPredictionState } from '@/state/prediction-atoms';
import { createClient } from '@/utils/supabase/client';

const useSubscribeToPredictionUpdates = (userId) => {
  const supabase = createClient();
  const setPredictionStatus = useSetRecoilState(predictionStatusState);
  const setFinalPrediction = useSetRecoilState(finalPredictionState);

  const handleUpdate = useCallback((payload) => {
    const { status, outputUrl } = payload.new;
    setPredictionStatus(status);
    if (status === 'succeeded') {
      setFinalPrediction(outputUrl);
    }
  }, [setPredictionStatus, setFinalPrediction]);
/*
  useEffect(() => {
    const subscription = supabase
      .from(`predictions:userId=eq.${userId}`)
      .on('UPDATE', handleUpdate)
      .subscribe();

    return () => {
      supabase.removeSubscription(subscription);
    };
  }, [userId, handleUpdate]);
  */
};

export default useSubscribeToPredictionUpdates;