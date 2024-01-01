'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { SupabaseClient } from '@supabase/supabase-js';
import { useImageEditSubmit } from '@/lib/replicate/useImageEditSubmit';

// TypeScript interface for props
interface ImageEditFormProps {
  modelId: string;
  supabase: SupabaseClient;
  userId: string;  // Assuming userId is a string
}

const ImageEditForm: React.FC<ImageEditFormProps> = ({ modelId, supabase, userId }) => {
  const [userInput, setUserInput] = useState<string>("");
  const [userInFile, setUserInFile] = useState<File | null>(null);
  const { isLoading, error, handleImageEditSubmit, newPrediction } = useImageEditSubmit(supabase);

  const handleTextInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => setUserInput(e.target.value);

  const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUserInFile(e.target.files[0]);
    }
  };

  const handleUserImageEditSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("ImageEditForm (userId): ", userId)
    console.log("ImageEditForm (modelId): ", modelId)
    console.log("ImageEditForm (userInput): ", userInput)
    if (!modelId || !userId) {
      console.error("No model selected or user not found");
      return;
    }
    await handleImageEditSubmit(userInput, userInFile, modelId, userId);
  };

  return (
    <form className="dynamic-input" onSubmit={handleUserImageEditSubmit}>
      <input
        className="dynamic-input-upload"
        type="file"
        accept="image/*"
        onChange={onImageChange}
      />
      <textarea
        placeholder="Describe modifications..."
        className="form-input"
        value={userInput}
        onChange={handleTextInputChange}
      />
      <button
        type="submit"
        disabled={isLoading}
        className="submit-button"
      >
        {isLoading ? "Processing..." : "Submit"}
      </button>
      {error && <div className="error">{error}</div>}
      {newPrediction && <div>New Prediction: {newPrediction}</div>}
    </form>
  );
};

export default ImageEditForm;
