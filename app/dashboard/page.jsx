"use client";

import React, { useState } from "react";
import ToolSelector from "@/components/dashboard/ToolSelector";
import ToolOptions from "@/components/dashboard/ToolOptions";
import DynamicInput from "@/components/dashboard/DynamicInput";
import DisplayResults from "@/components/dashboard/DisplayResults";
import { createClient } from "@/utils/supabase/client";


const DashboardPage = () => {
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

  const handleExampleImageChange = (newExampleImage) => {
    setExampleImage(newExampleImage);
    console.log("exampleImage: ", exampleImage);
  };

  return (
    <div className="w-full flex flex-col items-center justify-start p-4">
      <div className="toolOptions">
        <ToolSelector onToolChange={handleToolChange} />
        <ToolOptions
          tool={selectedTool}
          handleModelChange={handleModelChange}
          onExampleImageChange={handleExampleImageChange}
        />
      </div>
      <div className="displayResults">
        <DisplayResults
          tool={selectedTool}
          prediction={prediction}
          predictionProgress={predictionProgress}
          selectedImage={selectedImage}
          exampleImage={exampleImage}
          newPrediction={newPrediction}
        />
      </div>
      <div className="dynamicInput">
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
  );
};

export default DashboardPage;
