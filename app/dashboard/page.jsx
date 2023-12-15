"use client";

import React, { useState } from "react";
import ToolSelector from "@/components/ToolSelector";
import ToolOptions from "@/components/ToolOptions";
import DynamicInput from "@/components/DynamicInput";
import DisplayResults from "@/components/DisplayResults";
import GallerySmall from "@/components/GallerySmall";
import { createClient } from "@/utils/supabase/client";


const DashboardPage = () => {
  const [modelName, setModelName] = useState("");
  const [prompt, setPrompt] = useState("");
  const [userInFile, setUserInFile] = useState(null);
  const [selectedVoice, setSelectedVoice] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [selectedTool, setSelectedTool] = useState("imageCreation");
  const [results, setResults] = useState({});
  const [predictionProgress, setPredictionProgress] = useState(0);
  const [exampleImage, setExampleImage] = useState(null);
  const [newPrediction, setNewPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState({});
  const supabase = createClient();

  const convertToDataURI = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleImageChange = async (event) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const imagePreview = URL.createObjectURL(file);
      setSelectedImage(imagePreview);
      const URI = await convertToDataURI(file);
      setUserInFile(URI);
    }
  };

  const handleVoiceChange = async (event) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const voicePreview = URL.createObjectURL(file);
      setSelectedVoice(voicePreview);
      const URI = await convertToDataURI(file);
      setUserInFile(URI);
    }
  };

  const handleToolChange = (tool) => {
    setSelectedTool(tool);
  };

  const handleModelChange = (modelId, friendlyName, shortDesc, example) => {
    setSelectedModel({ modelId, friendlyName, shortDesc, example });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/replicate/txt2img", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ allInputs }),
      });

      const responseData = await response.json();
      setPrediction(responseData);
    } catch (error) {
      console.error("Error fetching prediction:", error);
    }
  };

  const handleExampleImageChange = (newExampleImage) => {
    setExampleImage(newExampleImage);
    console.log("exampleImage: ", exampleImage)
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="h-[90vh] w-full flex flex-col items-center justify-start p-4">
        <div className="w-full flex flex-row justify-start items-center gap-2 p-2">
        <GallerySmall />
        </div>

        <div className="flex-1 w-full bg-white mt-4 p-4 rounded-lg shadow-md">
          <ToolSelector onToolChange={handleToolChange} />
          <ToolOptions
            tool={selectedTool}
            handleModelChange={handleModelChange}
            onExampleImageChange={handleExampleImageChange}
          />
          <div className="flex flex-row gap-4">
            <DisplayResults
              tool={selectedTool}
              prediction={prediction}
              predictionProgress={predictionProgress}
              selectedImage={selectedImage}
              exampleImage={exampleImage}
              newPrediction={newPrediction}
            />
            <div className="w-2/3 h-full bg-gray-300 rounded-lg">
              <div className="w-1/3 flex flex-col gap-4">
                <div className="dynamic-input flex flex-row justify-center h-full m-2">
                  <DynamicInput
                    userId={userId}
                    tool={selectedTool}
                    selectedModel={selectedModel}
                    userInFile={userInFile}
                    onImageChange={handleImageChange}
                    setNewPrediction={setNewPrediction}
                    setPrediction={setPrediction}
                    supabase={supabase} // 'supabase' is not defined in the provided code
                    onResultsChange={(newResults) => setResults(newResults)}
                    onPredictionProgressChange={(progress) =>
                      setPredictionProgress(progress)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
