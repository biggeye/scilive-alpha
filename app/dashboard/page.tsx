<<<<<<< HEAD
'use client'

import React, { useState } from 'react';
import deployments from '@/data/replicate/deployments';

const DashboardPage = () => {
  const [modelName, setModelName] = useState('');
  const [prompt, setPrompt] = useState('');
  const [prediction, setPrediction] = useState(null);
  
  const selectedModel = deployments.find(model => model.modelName === modelName);

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
    // Add more conditions for different types of inputs as needed
  });
};

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
    try {
      const response = await fetch('/api/replicate/txt2img', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ modelName, prompt })
    });
    
    const responseData = await response.json();
    
      setPrediction(responseData);
    } catch (error) {
      console.error('Error fetching prediction:', error);
    }
  };

  return (
<form onSubmit={handleSubmit}>
    <div>
      <label>Model Name:</label>
      <select value={modelName} onChange={(e) => setModelName(e.target.value)}>
        <option value="">Select a Model</option>
        {deployments.map((model, index) => (
          <option key={index} value={model.modelName}>{model.modelName}</option>
        ))}
      </select>
    </div>
    {renderDynamicFields()}
    <button type="submit">Predict</button>
    {prediction && <div>Output: {JSON.stringify(prediction)}</div>}
  </form>
  );
};

export default DashboardPage;
=======
const title = "Dashboard"

const DashboardPage = () => {

    return(
        <p>
            Dashboard Content
        </p>
    )
}
>>>>>>> ad490ca (.)
