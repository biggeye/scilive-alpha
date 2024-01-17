'use client'
import React, { useEffect, useState } from "react";
import { Spacer, Box, Select, Flex } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { exampleImageState, selectedModelFriendlyNameState, selectedModelIdState } from "@/state/selected_model-atoms";
import type { SelectedModel } from "@/types";

interface ToolOptionsProps {
  tool: string;
}

const ToolOptions = ({ tool }: ToolOptionsProps) => {
  const [selectedModelId, setSelectedModelId] = useRecoilState(selectedModelIdState);
  const [selectedModelFriendlyName, setSelectedModelFriendlyName] = useRecoilState(selectedModelFriendlyNameState);
  const [exampleImage, setExampleImage] = useRecoilState(exampleImageState);
  const [modelsData, setModelsData] = useState<SelectedModel[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getModels({ tool });
  }, [tool]);

  useEffect(() => {
    if (modelsData.length > 0) {
      setExampleImage("");
      const firstModel = modelsData[0];
      setSelectedModelId(firstModel.id);
      setSelectedModelFriendlyName(firstModel.friendlyname);
      setExampleImage(firstModel.example || "");
    }
  }, [modelsData, setSelectedModelId, setSelectedModelFriendlyName, setExampleImage]);
  

  const getModels = async ({ tool }: ToolOptionsProps) => {
    try {
      const response = await fetchModelData(tool);

      if (response && response.ok) {
        const responseBody = await response.json();
        if (Array.isArray(responseBody.data)) { // Extracting the array from the 'data' key
          setModelsData(responseBody.data);
          console.log(modelsData);
        } else {
          console.error("Unexpected data format:", responseBody);
        }
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
    switch (tool) {

      case "imageCreation":
        const txt2imgResponse = await fetch(`${process.env.NEXT_PUBLIC_DEFAULT_URL}/api/content/getModels/txt2img`);
        return txt2imgResponse;

      case "imageEditing":
        const img2imgResponse = await fetch(`${process.env.NEXT_PUBLIC_DEFAULT_URL}/api/content/getModels/img2img`);
        return img2imgResponse;

      case "imageNarratives":
        const img2txtResponse = await fetch(`${process.env.NEXT_PUBLIC_DEFAULT_URL}/api/content/getModels/img2txt`);
        return img2txtResponse;

      case "avatarStreaming":
        const avatarsResponse = await fetch(`${process.env.NEXT_PUBLIC_DEFAULT_URL}/api/content/getModels/avatars`);
        return avatarsResponse;
      default:
        return Promise.reject("Invalid tool type");
    }
  }

  const handleSelectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSelectedModelId = event.target.value;
    setSelectedModelId(newSelectedModelId);
    const selectedModel = modelsData.find(model => model.id === newSelectedModelId);
    if (selectedModel) {
      setSelectedModelFriendlyName(selectedModel.friendlyname); // Assuming each model has a 'friendlyName' property
      setExampleImage(selectedModel.example || "");
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Or any loading indicator
  }

  return (
    <Box marginBottom="3px" maxWidth="640px" p="5px">
      <Flex>
        <Spacer />
        <Select variant="flushed" width="75%" onChange={handleSelectionChange} size="xs">
          {modelsData?.map(model => (
            <option key={model.id} value={model.id}>
              {model.friendlyname} {/* Updated to match the property name */}
            </option>
          )) ?? <option>Loading models...</option>}
        </Select>
        <Spacer />
      </Flex>
    </Box>
  );

};

export default ToolOptions;
