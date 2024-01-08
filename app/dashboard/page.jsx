"use client";
import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import {
  Grid,
  GridItem,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Center,
  Text,
  Flex,
} from "@chakra-ui/react";
import ToolOptions from "@/components/dashboard/ToolOptions";
import DisplayResults from "@/components/dashboard/DisplayResults";
import ImageCreateForm from "@/components/replicate/ImageCreateForm";
import ImageEditForm from "@/components/replicate/ImageEditForm";

const DashboardPage = () => {
  // User related state
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState(null);
  const [sessionData, setSessionData] = useState(null);

  // Tool selection and settings
  const [selectedTool, setSelectedTool] = useState("imageCreation");
  const [selectedModel, setSelectedModel] = useState({});
  const [selectedVoice, setSelectedVoice] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [exampleImage, setExampleImage] = useState(null);

  // Prediction and results data
  const [prediction, setPrediction] = useState(null);
  const [newPrediction, setNewPrediction] = useState(null);
  const [predictionProgress, setPredictionProgress] = useState(0);
  const [results, setResults] = useState({});
  const [error, setError] = useState(null);
  const [userInFile, setUserInFile] = useState(null);

  const supabase = createClient();
  const modelId = selectedModel ? selectedModel.modelId : null;

  const convertToDataURI = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleImageChange = async (event) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const imagePreview = URL.createObjectURL(file);
      setSelectedImage(imagePreview);
      const URI = await convertToDataURI(file);
      setUserInFile(URI);
    }
  };

  const handleVoiceChange = async (event) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const voicePreview = URL.createObjectURL(file);
      setSelectedVoice(voicePreview);
      const URI = await convertToDataURI(file);
      setUserInFile(URI);
    }
  };

  const handleTabsChange = (index) => {
    let tool;
    if (index === 0) {
      tool = "imageCreation";
    } else if (index === 1) {
      tool = "imageEditing";
    }
    setSelectedTool(tool);
    setExampleImage(null);
  };

  const handleModelChange = (modelId, friendlyName, shortDesc, example) => {
    setSelectedModel({ modelId, friendlyName, shortDesc, example });
  };

  const handleExampleImageChange = (newExampleImage) => {
    setExampleImage(newExampleImage);
    console.log("exampleImage: ", exampleImage);
  };

  const handleUserImageUpload = (newUserImage) => {
    setExampleImage(newUserImage);
  };

  return (
    <Grid
      templateRows="3"
      templateColumns="1"
      gap={4}
      mt=".25rem"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Tabs align="center" size="sm" onChange={handleTabsChange}>
        <GridItem>
          <TabList>
            <Tab>Image Creation</Tab>
            <Tab>Image Editing</Tab>
        
          </TabList>
          <ToolOptions
            tool={selectedTool}
            handleModelChange={handleModelChange}
            onExampleImageChange={handleExampleImageChange}
          />
        </GridItem>
        <GridItem overflowY="auto">
          <DisplayResults 
          />
        </GridItem>
        <GridItem position="fixed" marginRight="auto" left="0" bottom="0" width="full">
          <TabPanels>
            <TabPanel>
     
                <ImageCreateForm
                  modelId={modelId}
                  supabase={supabase}
                  userId={userId}
                />
            
            </TabPanel>
            <TabPanel>
           
                <ImageEditForm
                  modelId={modelId}
                  supabase={supabase}
                  userId={userId}
                  handleUserImageUpload={handleUserImageUpload}
                />
       
            </TabPanel>
  
          </TabPanels>
        </GridItem>
      </Tabs>
    </Grid>
  );
};

export default DashboardPage;
