'use client';
import React, { useEffect, useState } from "react";
import { Text, Spacer, Box, Select, Flex, Progress, Skeleton } from "@chakra-ui/react";
import { useRecoilState, useRecoilValue } from "recoil";
import { exampleImageState, selectedModelFriendlyNameState, selectedModelIdState, selectedModelShortDescState, selectedModelNameState, selectedTabState } from "@/state/replicate/config-atoms";
import type { SelectedModel } from "@/types";
import { finalPredictionState } from "@/state/replicate/prediction-atoms";
import { fetchTxt2ImgModels, fetchImg2ImgModels } from "@/lib/modelServer";
import { currentPageState } from '@/state/user/user_state-atoms';

const ToolOptions = ({ localPage }) => {
  const currentPage = useRecoilValue(currentPageState);
  const [selectedModelId, setSelectedModelId] = useRecoilState(selectedModelIdState);
  const [selectedModelFriendlyName, setSelectedModelFriendlyName] = useRecoilState(selectedModelFriendlyNameState);
  const [selectedModelShortDesc, setSelectedModelShortDesc] = useRecoilState(selectedModelShortDescState);
  const [selectedModelName, setSelectedModelName] = useRecoilState(selectedModelNameState);
  const [exampleImage, setExampleImage] = useRecoilState(exampleImageState);
  const [modelsData, setModelsData] = useState<SelectedModel[]>([]);
  const [modelsLoading, setModelsLoading] = useState(false);
  const [finalPrediction, setFinalPrediction] = useRecoilState(finalPredictionState);


  useEffect(() => {
    // Prioritize localPage over the global currentPage state if it's provided
    const effectivePage = localPage || currentPage;
    resetAllModelStates();
    fetchModels(effectivePage);
  }, [currentPage, localPage]);

/*
  useEffect(() => {
    resetAllModelStates();
    fetchModels(currentPage); // Pass currentPage to fetchModels function
  }, [currentPage]);

*/

  useEffect(() => {
    if (modelsData.length > 0 && selectedModelId === "") {
      updateModelStates(modelsData[0]);
    }
  }, [modelsData]);


  const updateModelStates = (model: SelectedModel) => {
    setFinalPrediction(null);
    setSelectedModelName(model.name);
    setSelectedModelId(model.id);
    setSelectedModelFriendlyName(model.friendlyname);
    setExampleImage(model.example || model.url || "");
    setSelectedModelShortDesc(model.shortdesc || "");
  };

  const fetchModels = async (page) => {
    setModelsLoading(true);
    try {
      let modelsData;
      switch (page) {
        case "createImage":
          modelsData = await fetchTxt2ImgModels();
          break;
        case "editImage":
          modelsData = await fetchImg2ImgModels();
          break;
        // Add more cases as needed
        default:
          modelsData = []; // Or set to a default state
      }
      setModelsData(modelsData);
    } catch (error) {
      console.error("Error fetching models:", error);
    } finally {
      setModelsLoading(false);
    }
  };


const handleSelectionChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSelectedModelId = event.target.value;
    const selectedModel = modelsData.find(model => model.id === newSelectedModelId);
    if (selectedModel) {
      updateModelStates(selectedModel);
    }
  };
  
  const fetchModelData = async (localPage?) => {
    switch (tool | localPage) {

      case "createImage":
        const txt2imgResponse = await fetchTxt2ImgModels();
        setModelsData(txt2imgResponse);
        return txt2imgResponse;

      case "editImage":
        const img2imgResponse = await fetchImg2ImgModels();
        setModelsData(img2imgResponse);
        return img2imgResponse;
   
        
      default:
        return Promise.reject("Invalid tool type");
    }
  }

  
  const resetAllModelStates = () => {
    setExampleImage("");
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
