'use client'

import React, { useState } from "react";
import { handleImageEditSubmit } from "@/lib/replicate/handleImageEditSubmit";
import { handleImageCreateSubmit } from "@/lib/replicate/handleImageCreateSubmit";
import ImageCreateForm from "../replicate/ImageCreateForm";
// Import AudioPlayer if it's a separate component
// import AudioPlayer from 'path-to-AudioPlayer';

const DynamicInput = ({
  userId,
  tool,
  selectedModel,
  userInFile,
  onImageChange,
  setPrediction,
  supabase,
  setNewPrediction,
}) => {
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // Define state for dynamic fields if necessary
  // const [selectedImage, setSelectedImage] = useState(null);
  // const [selectedVoice, setSelectedVoice] = useState(null);
  // const [prompt, setPrompt] = useState("");

  const modelId = selectedModel ? selectedModel.modelId : null;

  const handleTextInputChange = (e) => {
    setUserInput(e.target.value);
  };

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

  const handleUserImageCreateSubmit = async () => {
    if (!modelId) {
      console.error("No model selected");
      return;
    }
    setIsLoading(true);
    await handleImageCreateSubmit(
      { userInput, modelId },
      setError,
      setPrediction,
      setNewPrediction
    );
    setIsLoading(false);
  };

  const renderDynamicFields = () => {
    if (!selectedModel || !selectedModel.input) return null;

    return Object.entries(selectedModel.input).map(([key, value], index) => {
      // Implement your logic for dynamic fields
      // Use state variables like selectedImage, selectedVoice, prompt as needed
    });
  };

  return (
    <>
      {tool === "imageCreation" && (
        <div className="dynamic-input flex flex-row justify-center h-full m-2">
          <ImageCreateForm modelId={modelId} supabase={supabase} />
        </div>
      )}

      {tool === "imageEditing" && (
        <div className="dynamic-input flex flex-row justify-center h-full m-3">
          <input
            type="file"
            accept="image/*"
            onChange={onImageChange}
            className="form-input text-md"
          />
          <input
            type="text"
            placeholder="Describe modifications..."
            className="form-input w-80 px-2 py-2 flex-grow"
            value={userInput}
            onChange={handleTextInputChange}
          />
          <button
            disabled={isLoading}
            onClick={handleUserImageEditSubmit}
            className="submit-button pr-6 pl-4 py-2"
          >
            {isLoading ? "Processing..." : "Submit"}
          </button>
        </div>
      )}

      {tool === "articleCreation" && (
        <div className="dynamic-input flex flex-row justify-center h-full m-3">
          <textarea
            placeholder="Enter text for article creation"
            className="form-input w-80 px-2 py-2 flex-grow"
            value={userInput}
            onChange={handleTextInputChange}
          />
          {/* Add a submit button if needed */}
        </div>
      )}

      {tool === "deployments" && renderDynamicFields()}
    </>
  );
};

export default DynamicInput;
