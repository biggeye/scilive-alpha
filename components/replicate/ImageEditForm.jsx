import React, { useState } from 'react';
import handleImageEditSubmit from '@/lib/replicate/handleImageEditSubmit'; // Custom hook for submission logic

const ImageEditForm = ({ modelId, supabase }) => {
  const [userInput, setUserInput] = useState("");
  const { isLoading, error, submitImageCreate, newPrediction } = useImageCreateSubmit(supabase);

  const handleTextInputChange = (e) => setUserInput(e.target.value);

  const handleUserImageEditSubmit = async () => {
    if (!modelId) {
      console.error("No model selected");
      return;
    }
    setIsLoading(true);
    await handleImageEditSubmit(
      userInput,
      userInFile,
      modelId,
      setError,
      setPrediction,
      userId,
      supabase,
      setNewPrediction
    );
    setIsLoading(false);
  };


  return (
    <div className="dynamic-input">
          <input
            className="dynamic-input-upload"
            type="file"
            accept="image/*"
            onChange={onImageChange}
          />
          <textarea
            type="text"
            placeholder="Describe modifications..."
            className="form-input"
            value={userInput}
            onChange={handleTextInputChange}
          />
          <button
            disabled={isLoading}
            onClick={handleUserImageEditSubmit}
            className="submit-button"
          >
            {isLoading ? "Processing..." : "Submit"}
          </button>
      {error && <div className="error">{error}</div>}
      {newPrediction && <div>New Prediction: {newPrediction}</div>}
    </div>
  );
};

export default ImageCreateForm;
