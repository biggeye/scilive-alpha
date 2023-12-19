import { useState } from 'react';
import handleImageCreateSubmit from '@/lib/replicate/handleImageCreateSubmit';

const useImageCreateSubmit = (supabase) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newPrediction, setNewPrediction] = useState(null);

  const submitImageCreate = async (userInput, modelId) => {
    setIsLoading(true);
    try {
      await handleImageCreateSubmit({
        imageCreateSubmit: { userInput, modelId },
        setError,
        setNewPrediction
      });
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, submitImageCreate, newPrediction };
};

export default useImageCreateSubmit;
