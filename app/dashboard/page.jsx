'use client'

import React, { useState } from 'react';
import deployments from '@/data/replicate/deployments';
import AudioPlayer from '@/components/AudioPlayer';
import ToolSelector from '@/components/ToolSelector';
import ToolOptions from '@/components/ToolOptions';
import DynamicInput from '@/components/DynamicInput';
import DisplayResults from '@/components/DisplayResults';
import { createClient } from '@/utils/supabase/client';

const DashboardPage = () => {
  const [modelName, setModelName] = useState('');
  const [prompt, setPrompt] = useState('');
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
      const response = await fetch('/api/replicate/txt2img', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ allInputs })
      });
    
      const responseData = await response.json();
      setPrediction(responseData);
    } catch (error) {
      console.error('Error fetching prediction:', error);
    }
  };

  const handleExampleImageChange = (newExampleImage) => {
    setExampleImage(newExampleImage);
  };
  
  return (
    <div className="flex-1 flex flex-col relative">
      <div className="bg-gray-200 h-12 flex items-center justify-start rounded-t-md p-1">
        <ToolSelector onToolChange={handleToolChange} />
        <ToolOptions
          tool={selectedTool}
          handleModelChange={handleModelChange}
          onExampleImageChange={handleExampleImageChange}
        />
      </div>
      <div className="flex-1 bg-white p-1 rounded-b-md">
        <DisplayResults
          tool={selectedTool}
          prediction={prediction}
          predictionProgress={predictionProgress}
          selectedImage={selectedImage}
          exampleImage={exampleImage}
          newPrediction={newPrediction}
        />
      </div>
      <div className="input-bar p-4 h-20">
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
