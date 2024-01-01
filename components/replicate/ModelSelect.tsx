'use client';

import React, { ChangeEvent } from "react";

// TypeScript interface for a model
interface Model {
  id: string;
  friendlyName: string;
  shortDesc: string;
  example: string;
}

// TypeScript interface for the component props
interface ModelSelectProps {
  handleModelChange: (modelId: string, modelName: string, shortDesc: string, example: string) => void;
  models: Model[];
}

const ModelSelect: React.FC<ModelSelectProps> = ({ handleModelChange, models }) => {
  const handleSelectionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedModelId = event.target.value;
    const selectedModel = models.find(model => model.id === selectedModelId);
    if (!selectedModel) {
      console.log(`No model found with id: ${selectedModelId}`);
      return;
    }
    const { id, friendlyName, shortDesc, example } = selectedModel;
    handleModelChange(id, friendlyName, shortDesc, example);
  };

  return (
    <div className="flex flex-col">
      <select onChange={handleSelectionChange}>
        {models.map((model) => (
          <option key={model.id} value={model.id}>
            {model.friendlyName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ModelSelect;
