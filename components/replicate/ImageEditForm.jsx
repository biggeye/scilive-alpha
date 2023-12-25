// ImageEditForm.jsx

import React, { useState } from 'react';
import { useImageEditSubmit } from '@/lib/replicate/useImageEditSubmit';

const ImageEditForm = ({ modelId, supabase }) => {
  const [userInput, setUserInput] = useState("");
  const [userInFile, setUserInFile] = useState(null);
  const { isLoading, error, handleImageEditSubmit, newPrediction } = useImageEditSubmit(supabase);

  const handleTextInputChange = (e) => setUserInput(e.target.value);

  const onImageChange = (e) => {
    setUserInFile(e.target.files[0]);
  };

  const handleUserImageEditSubmit = async () => {
    if (!modelId) {
      console.error("No model selected");
      return;
    }
    await handleImageEditSubmit(userInput, userInFile, modelId, supabase.auth.user().id);
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
  
  export default ImageEditForm;
  