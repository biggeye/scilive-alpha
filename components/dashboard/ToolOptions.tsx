'use client'
import React, { useEffect, useState } from "react";
import { Box, Select, Flex, Text } from "@chakra-ui/react";
import { useRecoilState, useRecoilValue } from "recoil";
import { exampleImageState, selectedModelState } from "@/state/selected_model-atoms";
import type { SelectedModel } from "@/types";

type ToolOptionsProps = {
  tool: string; // Assuming tool is a string. Adjust the type as needed.
};

const ToolOptions = ({ tool }: ToolOptionsProps) => {
  const [selectedModel, setSelectedModel] = useRecoilState(selectedModelState);
  const [exampleImage, setExampleImage] = useRecoilState(exampleImageState);
  const [modelsData, setModelsData] = useState<SelectedModel[]>([]); // Initialize with an appropriate type


  const getModels = async () => { 
    let response;
    try {
      switch(tool) {
        case "imageEditing":
          response = await fetch(`${process.env.NEXT_PUBLIC_DEFAULT_URL}/api/content/getModels/img2img`);
          break;
        case "imageCreation":
          response = await fetch(`${process.env.NEXT_PUBLIC_DEFAULT_URL}/api/content/getModels/txt2img`);
          break;
        case "imageNarratives":
          response = await fetch(`${process.env.NEXT_PUBLIC_DEFAULT_URL}/api/content/getModels/img2txt`);
          break;
      }
      if (response && response.ok) {
        const data = await response.json();
        setModelsData(data);
      } else {
        console.error("ToolOptions: no data fetched or error in response.");
      }
    } catch (error) {
      console.error("Error fetching models: ", error);
    }
  }
  
useEffect(() => {
  getModels();
}, [tool]);

const handleSelectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  const selectedModelId = event.target.value;
  const selection = modelsData.find((model: any) => model.id === selectedModelId);

  if (selection) {
    setSelectedModel({ 
      id: selection.id, 
      friendlyName: selection.friendlyName || "", 
      shortDesc: selection.shortDesc || "", 
      example: selection.example || ""
    });
    setExampleImage(selection.example || "");
  } else {
    console.log(`No model found with id: ${selectedModelId}`);
  }
};



  return modelsData ? (
    <Box maxWidth="640px" p="5px">
      <Flex>
        <Select variant="flushed" width="100%" onChange={handleSelectionChange} size="xs">
        {modelsData.map((model: SelectedModel) => (
            <option key={model.id} value={model.id}>
              {model.friendlyName}
            </option>
          ))}
        </Select>
      </Flex>
    </Box>
  ) : null;
};

export default ToolOptions;
