// components/PredictForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const PredictForm = () => {
  const [modelName, setModelName] = useState('');
  const [prompt, setPrompt] = useState('');
  const [prediction, setPrediction] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/replicate/predict', { modelName, prompt });
      setPrediction(response.data);
    } catch (error) {
      console.error('Error fetching prediction:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Model Name:</label>
        <input type="text" value={modelName} onChange={(e) => setModelName(e.target.value)} />
      </div>
      <div>
        <label>Prompt:</label>
        <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
      </div>
      <button type="submit">Predict</button>
      {prediction && <div>Output: {JSON.stringify(prediction)}</div>}
    </form>
  );
};

export default PredictForm;