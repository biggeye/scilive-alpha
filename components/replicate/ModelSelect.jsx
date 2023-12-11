

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
    <div className="flex flex-col">
      <select
      >
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