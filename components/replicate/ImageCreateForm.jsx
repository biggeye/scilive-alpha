import React, { useState } from 'react';
import useImageCreateSubmit from '@/lib/replicate/useImageCreateSubmit'; // Custom hook for submission logic

const ImageCreateForm = ({ modelId, supabase }) => {
  const [userInput, setUserInput] = useState("");
  const { isLoading, error, submitImageCreate, newPrediction } = useImageCreateSubmit(supabase);

  const handleInputChange = (e) => setUserInput(e.target.value);

  const handleSubmit = async () => {
    await submitImageCreate(userInput, modelId);
  };

  return (
    <div className="dynamic-input">
      <input
      className="form-input"
        placeholder="Enter text for image creation"
        value={userInput}
        onChange={handleInputChange}
        disabled={isLoading}
      />
      <button className="submit-button" onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? "Processing..." : "Submit"}
      </button>
      {error && <div className="error">{error}</div>}
      {newPrediction && <div>New Prediction: {newPrediction}</div>}
    </div>
  );
};

export default ImageCreateForm;
