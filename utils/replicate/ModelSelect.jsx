import { VStack, Select } from "@chakra-ui/react";
// Sort the models based on their friendly names

const ModelSelect = ({ handleModelChange, models }) => {

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
    handleModelChange(modelId, modelName, shortDesc, example);
  };
  

  return (
    <VStack>
      <Select
        p={1}
        pl={3}
        pr={3}
        fontSize={["sm", "md", "lg"]}
        onChange={handleSelectionChange}
        size={["xs", "sm"]}
      >
        {models.map((model) => (
          <option key={model.id} value={model.id}>
            {model.friendlyName}
          </option>
        ))}
      </Select>
    </VStack>
  );
};

export default ModelSelect;