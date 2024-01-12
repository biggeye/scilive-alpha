'use client'
import React, { useEffect, useState } from "react";
import { Box, Select, Flex } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { exampleImageState, selectedModelFriendlyNameState, selectedModelIdState } from "@/state/selected_model-atoms";
import type { SelectedModel } from "@/types";

type ToolOptionsProps = {
  tool: string;
};

const ToolOptions = ({ tool }: ToolOptionsProps) => {
  const [selectedModelId, setSelectedModelId] = useRecoilState(selectedModelIdState);
  const [selectedModelFriendlyName, setSelectedModelFriendlyName] = useRecoilState(selectedModelFriendlyNameState);
  const [exampleImage, setExampleImage] = useRecoilState(exampleImageState);
  const [modelsData, setModelsData] = useState<SelectedModel[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getModels();
  }, [tool]);

  const getModels = async () => { 
    try {
      const response = await fetchModelData(tool);
      if (response && response.ok) {
        const { data } = await response.json();
        setModelsData(data);
      } else {
        console.error("ToolOptions: no data fetched or error in response.");
      }
    } catch (error) {
      console.error("Error fetching models: ", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchModelData = async (tool: string) => {
    switch(tool) {
      case "imageEditing":
        return fetch(`${process.env.NEXT_PUBLIC_DEFAULT_URL}/api/content/getModels/img2img`);
      
        case "imageCreation":
        return fetch(`${process.env.NEXT_PUBLIC_DEFAULT_URL}/api/content/getModels/txt2img`);
      
        case "imageNarratives":
        return fetch(`${process.env.NEXT_PUBLIC_DEFAULT_URL}/api/content/getModels/img2txt`);
      
        default:
        return Promise.reject("Invalid tool type");
    }
  }

  const handleSelectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSelectedModelId = event.target.value;
    setSelectedModelId(newSelectedModelId);
    const selectedModel = modelsData.find(model => model.id === newSelectedModelId);
    if (selectedModel) {
      setExampleImage(selectedModel.example || "");
      setSelectedModelFriendlyName(selectedModel.friendlyName);
    console.log("handleSelectionChange: ", selectedModelFriendlyName, selectedModelId)
  }
};


  if (loading) {
    return <div>Loading...</div>; // Or any loading indicator
  }

  return (
    <Box maxWidth="640px" p="5px">
      <Flex>
        <Select variant="flushed" width="100%" onChange={handleSelectionChange} size="xs">
          {modelsData.map(model => (
            <option key={model.id} value={model.id}>
              {model.friendlyName}
            </option>
          ))}
        </Select>
      </Flex>
    </Box>
  );
};

export default ToolOptions;
