'use client';
import React, { useEffect, useState } from "react";
import { Text, Spacer, Box, Select, Flex, Progress, Skeleton } from "@chakra-ui/react";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedModelInputFieldsState, exampleImageState, selectedModelFriendlyNameState, selectedModelIdState, selectedModelShortDescState, selectedModelNameState, selectedTabState, userContentExamplesState, examplesLoadingState } from "@/state/replicate/config-atoms";
import type { SelectedModel } from "@/types";
import { finalPredictionState, predictionIsLoadingState } from "@/state/replicate/prediction-atoms";


const ToolOptions = () => {
  const [selectedModelInputFields, setSelectedModelInputFields] = useRecoilState(selectedModelInputFieldsState);
  const [selectedModelId, setSelectedModelId] = useRecoilState(selectedModelIdState);
  const [selectedModelFriendlyName, setSelectedModelFriendlyName] = useRecoilState(selectedModelFriendlyNameState);
  const [selectedModelShortDesc, setSelectedModelShortDesc] = useRecoilState(selectedModelShortDescState);
  const [selectedModelName, setSelectedModelName] = useRecoilState(selectedModelNameState);
  const [exampleImage, setExampleImage] = useRecoilState(exampleImageState);
  const [modelsData, setModelsData] = useState<SelectedModel[]>([]);
  const [examplesLoading, setExamplesLoading] = useRecoilState(examplesLoadingState);
  const [modelsLoading, setModelsLoading] = useState(false);
  const tool = useRecoilValue(selectedTabState);
  const [userContentExamples, setUserContentExamples] = useRecoilState(userContentExamplesState);
  const [finalPrediction, setFinalPrediction] = useRecoilState(finalPredictionState);
  const [predictionIsLoading, setPredictionIsLoading] = useRecoilState(predictionIsLoadingState);

  useEffect(() => {
    if (tool) {
      resetAllModelStates();
      fetchModels();
    }
  }, [tool]);

  useEffect(() => {
    if (modelsData.length > 0 && selectedModelId === "") {
      updateModelStates(modelsData[0]);
    }
  }, [modelsData]);


  const updateModelStates = (model: SelectedModel) => {
    setPredictionIsLoading(false);
    setFinalPrediction(null);
    setSelectedModelInputFields(model.inputtype);
    setSelectedModelName(model.name);
    setSelectedModelId(model.id);
    setSelectedModelFriendlyName(model.friendlyname);
    setExampleImage(model.example || model.url || "");
    setSelectedModelShortDesc(model.shortdesc || "");
  };

  const fetchModels = async () => {
    setModelsLoading(true);
    try {
      const response = await fetchModelData();
      if (response && response.ok) {
        const { data } = await response.json();
        setModelsData(data);
      }
    } catch (error) {
      console.error("Error fetching models:", error);
    } finally {
      setModelsLoading(false);
    }
  };

 /* const fetchUserContentExamples = async () => {
    setExamplesLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_DEFAULT_URL}/api/content/getModels/userContent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ selectedModelId })
      });
      if (response.ok) {
        const userContent = await response.json();
        setUserContentExamples(userContent.map((item: any) => item.url));
      }
    } catch (error) {
      console.error("Error fetching user content examples:", error);
    } finally {
      setExamplesLoading(false);
    }
  };
*/
  const handleSelectionChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSelectedModelId = event.target.value;
    const selectedModel = modelsData.find(model => model.id === newSelectedModelId);
    if (selectedModel) {
      updateModelStates(selectedModel);
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
   
      case "imageNarrative":
        const imageNarrativeResponse = await fetch(`${process.env.NEXT_PUBLIC_DEFAULT_URL}/api/content/getModels/img2txt`);
        return imageNarrativeResponse;
      
      default:
        return Promise.reject("Invalid tool type");
    }
  }

  
  const resetAllModelStates = () => {
    setExampleImage("");
    setUserContentExamples([]);
    setSelectedModelName("");
    setSelectedModelFriendlyName("");
    setSelectedModelShortDesc("");
    setSelectedModelId("");
  }

  return (
    <Box marginBottom="3px" maxWidth="640px" p="5px">
      <Flex alignItems="center" justifyContent="center">
        <Spacer />
        <Text fontSize={{ base: "sm", md: "md" }}>MODEL:  {"   "}</Text>
        <Spacer />
        {modelsLoading ? (
        <Progress isIndeterminate={true} />
        ) : (
          <Select fontSize={{ base: "sm", md: "md" }} variant="flushed" width="75%" onChange={handleSelectionChange} size="xs">
            {modelsData.map(model => (
              <option key={model.id} value={model.id}>{model.friendlyname || model.name}</option>
            ))}
          </Select>
        )}
        <Spacer />
      </Flex>
    </Box>
  );
};

export default ToolOptions;
