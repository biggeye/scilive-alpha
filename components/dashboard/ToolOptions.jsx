'use client'

import React, { useEffect, useState } from "react";
import ModelSelect from "@/components/replicate/ModelSelect";
import txt2img from "@/data/replicate/txt2img";
import img2img from "@/data/replicate/img2img";
import deployments from "@/data/replicate/deployments";
import { Box } from "@chakra-ui/react";

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

   if (models) {
    return (
      <Box width="75%">
      <ModelSelect className="toolOptions" models={models} handleModelChange={handleModelChange} />
      </Box>
    );
  } else {
    return null;
  }
};

export default ToolOptions;