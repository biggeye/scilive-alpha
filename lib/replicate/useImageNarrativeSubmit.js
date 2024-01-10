import { useState } from "react";

export const useImageNarrativeSubmit = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [displayedResponse, setDisplayedResponse] = useState("");

  const submitImageNarrative = async (imageNarrativesUpload, imageNarrativesPrompt) => {
    setIsLoading(true);

    const formData = new FormData();
    if (imageNarrativesUpload) {
        formData.append("imageNarrativesUpload", imageNarrativesUpload);
    }
    formData.append("imageNarrativesPrompt", imageNarrativesPrompt);

    try {
      const response = await fetch('/api/replicate/narratives', {
          method: 'POST',
          body: formData
      });

      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setDisplayedResponse(result.output);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, submitImageNarrative, displayedResponse }
}
