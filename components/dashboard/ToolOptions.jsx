'use client'

import React, { useEffect, useState } from "react";
import ModelSelect from "@/components/replicate/ModelSelect";
import txt2img from "@/data/replicate/txt2img";
import img2img from "@/data/replicate/img2img";
import img2txt from "@/data/replicate/img2txt";
import avatars from "@/data/replicate/avatars";
import { Box } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { exampleImageState } from "@/state/prediction-atoms";

const ToolOptions = ({ 
  tool, 
  handleModelChange
}) => {
  const [selectedModel, setSelectedModel] = useState(null);
  const [exampleImage, setExampleImage] = useRecoilState(exampleImageState);

  // Define models here in a scope accessible by the handleSelectionChange function
  let models;
  if (tool === "imageEditing") {
    models = img2img;
  } else if (tool === "imageCreation") {
    models = txt2img;
  } else if (tool === "imageNarratives") {
    models = img2txt;
  } else if (tool === "avatarStreaming") {
    models = avatars;
  }

  useEffect(() => {
    if (selectedModel) {
      setExampleImage(selectedModel.example);
    }
  }, [selectedModel]);

   if (models) {
    return (
      <Box maxWidth="640px" p="5px">
      <ModelSelect className="toolOptions" models={models} handleModelChange={handleModelChange} />
      </Box>
    );
  } else {
    return null;
  }
};

export default ToolOptions;