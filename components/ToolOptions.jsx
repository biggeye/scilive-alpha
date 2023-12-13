//(ToolOptions.jsx)
import React, { useEffect, useState } from "react";
import ModelSelect from "@/utils/replicate/ModelSelect";
import txt2img from "@/data/replicate/txt2img";
import img2img from "@/data/replicate/img2img";
import deployments from "@/data/replicate/deployments";

const ToolOptions = ({ 
  tool, 
  handleModelChange, 
  onExampleImageChange 
}) => {
  const [selectedModel, setSelectedModel] = useState(null);

  // Define models here in a scope accessible by the handleSelectionChange function
  let models;
  if (tool === "imageEditing") {
    models = img2img;
  } else if (tool === "imageCreation") {
    models = txt2img;
  } else if (tool === "deployments") {
    models = deployments;
  }

  useEffect(() => {
    if (selectedModel) {
      onExampleImageChange(selectedModel.example);
    }
  }, [selectedModel, onExampleImageChange]);

  const handleSelectionChange = (event) => {
    const selectedModelId = event.target.value;
    const selectedModel = models.find(model => model.id === selectedModelId);
    if (!selectedModel) {
      console.log(`No model found with id: ${selectedModelId}`);
      return;
    }
    const modelId = selectedModel.id;
    const modelName = selectedModel.friendlyName;
    const shortDesc = selectedModel.shortDesc;
    const example = selectedModel.example;
    console.log("modelId: ", modelId);
    handleModelChange(modelId, modelName, shortDesc, example);
  };

  if (tool === "articleCreation") {
    return <div>Settings for Article Creation</div>;
  } else if (models) {
    return (
      <ModelSelect models={models} handleSelectionChange={handleSelectionChange} />
    );
  } else {
    return null;
  }
};

export default ToolOptions;