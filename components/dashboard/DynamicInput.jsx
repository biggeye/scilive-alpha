'use client'

import React, { useState } from "react";
import { handleImageEditSubmit } from "@/utils/replicate/handleImageEditSubmit";
import { handleImageCreateSubmit } from "@/utils/replicate/handleImageCreateSubmit";

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

  const handleTextInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleUserImageEditSubmit = async () => {
    if (!selectedModel) {
      console.error("No model selected");
      return;
    }
    setIsLoading(true);
    const modelId = selectedModel.modelId;
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
    if (!selectedModel) {
      console.error("No model selected");
      return;
    }
    setIsLoading(true);
    const modelId = selectedModel.modelId;
    const imageCreateSubmit = {
      userInput: userInput,
      modelId: modelId,
    };
    console.log(imageCreateSubmit);
    await handleImageCreateSubmit(
      {imageCreateSubmit},
      setError,
      setPrediction,
      setNewPrediction
    );
    setIsLoading(false);
  };

  const renderDynamicFields = () => {
    if (!selectedModel || !selectedModel.input) return null;

    return Object.entries(selectedModel.input).map(([key, value], index) => {
        if (key === 'prompt' || key === 'text' || key === 'text_prompt') {
          return (
            <div key={index}>
              <label>{key}:</label>
              <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
            </div>
          );
        }
        if (selectedModel.type.startsWith('img')) {
          return (
            <div>
              <label>Upload Image:</label>
              <input type="file" onChange={handleImageChange} />
              {selectedImage && <img src={selectedImage} alt="Preview" />}
            </div>
          );
        }
        if (selectedModel.type.match('txt2audio')) {
          return (
            <div>
               <input type="text" value={prompt} />
               <input type="file" onChange={handleVoiceChange} />
               {selectedVoice && <AudioPlayer src={selectedVoice} />}
            </div>
          )
        }
      })};
     
  return (
    <>
      {tool === "imageCreation" && (
        <div className="dynamic-input flex flex-row justify-center h-full m-2">
          <input
            placeholder="Enter text for image creation"
            className="form-input w-80  px-2 py-2 flex-grow"
            onChange={handleTextInputChange}
          />
          <button
            disabled={isLoading}
            onClick={handleUserImageCreateSubmit}
            className="submit-button"
          >
            {isLoading ? "Processing..." : "Submit"}
          </button>
        </div>
      )}

      {tool === "imageEditing" && (
        <div className="dynamic-input flex flex-row justify-center h-full m-2">
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
        <div className="flex flex-row justify-center h-full">
          <textarea
            placeholder="Enter text for article creation"
            className="form-input w-80 ml-40 px-2 py-2 flex-grow"
          />
          {/* Add a submit button if needed */}
        </div>
      )}

      {tool === "deployments" && renderDynamicFields()}
    </>
  );
};

export default DynamicInput;