'use client';

import React, { ChangeEvent, useEffect } from "react";
import { Select, Flex, Text } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { exampleImageState } from "@/state/prediction-atoms";

interface Model {
  id: string;
  friendlyName: string;
  shortDesc: string;
  example: string;
}

interface ModelSelectProps {
  handleModelChange: (modelId: string, modelName: string, shortDesc: string, example: string) => void;
  models: Model[];
}

const ModelSelect: React.FC<ModelSelectProps> = ({ handleModelChange, models }) => {
  const [exampleImage, setExampleImage] = useRecoilState(exampleImageState);

  useEffect(() => {

  })

  const handleSelectionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedModelId = event.target.value;
    const selectedModel = models.find(model => model.id === selectedModelId);

    if (!selectedModel) {
      console.log(`No model found with id: ${selectedModelId}`);
      return;
    }
    const { id, friendlyName, shortDesc, example } = selectedModel;
    
    setExampleImage(example);
    handleModelChange(id, friendlyName, shortDesc, example);
  };

  return (
    <Flex>
      <Select variant="flushed" width="100%" onChange={handleSelectionChange} size="xs">
        {models.map((model) => (
          <option key={model.id} value={model.id}>
            {model.friendlyName}
          </option>
        ))}
      </Select>
    </Flex>
  );
};

export default ModelSelect;
