'use client'
import React, { useEffect, useState } from "react";
import { Spacer, Box, Select, Flex } from "@chakra-ui/react";
import { useRecoilState, useRecoilValue } from "recoil";
import { exampleImageState, selectedModelFriendlyNameState, selectedModelIdState, selectedModelShortDescState, selectedModelNameState } from "@/state/config-atoms";
import type { SelectedModel } from "@/types";
import { selectedTabState } from "@/state/config-atoms";

const ToolOptions = () => {
  const [selectedModelId, setSelectedModelId] = useRecoilState(selectedModelIdState);
  const [selectedModelFriendlyName, setSelectedModelFriendlyName] = useRecoilState(selectedModelFriendlyNameState);
  const [selectedModelShortDesc, setSelectedModelShortDesc] = useRecoilState(selectedModelShortDescState);
  const [selectedModelName, setSelectedModelName] = useRecoilState(selectedModelNameState);
  const [exampleImage, setExampleImage] = useRecoilState(exampleImageState);
  const [modelsData, setModelsData] = useState<SelectedModel[]>([]);
  const [loading, setLoading] = useState(false);
  const tool = useRecoilValue(selectedTabState);

  useEffect(() => {
    setLoading(true);
    getModels();
  }, [tool]);

  useEffect(() => {
    if (modelsData.length > 0) {
      setExampleImage("");
      const firstModel = modelsData[0];
      setSelectedModelName(firstModel.name);
      setSelectedModelId(firstModel.id);
      setSelectedModelFriendlyName(firstModel.friendlyname);
      setExampleImage(firstModel.example || "");
      setSelectedModelShortDesc(firstModel.shortdesc || "");
    }
  }, [modelsData, setSelectedModelShortDesc, setSelectedModelId, setSelectedModelFriendlyName, setExampleImage]);
  

  const getModels = async () => {
    try {
      const response = await fetchModelData();

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


  const fetchModelData = async () => {
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
