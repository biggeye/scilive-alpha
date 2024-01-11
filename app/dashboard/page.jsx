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
import ImageCreateForm from "@/components/dashboard/replicate/ImageCreateForm";
import ImageEditForm from "@/components/dashboard/replicate/ImageEditForm";
import ImageNarratives from "../../components/dashboard/replicate/ImageNarrativeForm";
import CreateStreamForm from "@/components/dashboard/d-id/CreateStreamForm";

import { useRecoilValue, useRecoilState } from "recoil";
import {
  userImageUploadState,
  userInFileState,
} from "@/state/prediction-atoms";
import {
  exampleImageState,
  selectedModelState,
} from "@/state/selected_model-atoms";

const convertToDataURI = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const DashboardPage = () => {
  const supabase = createClient();
  const [selectedTab, setSelectedTab] = useState([0]);
  const [userInFile, setUserInFile] = useRecoilState(userInFileState);
  const userImageUpload = useRecoilValue(userImageUploadState);
  const exampleImage = useRecoilValue(exampleImageState);

  const handleImageChange = async (event) => {
    if (userImageUpload) {
      const imagePreview = URL.createObjectURL(userImageUpload);
      setDisplayedImage(imagePreview);
      const URI = await convertToDataURI(file);
      setUserInFile(URI);
      return;
    } else {
      setDisplayedImage(exampleImage);
    }
  };

  const handleTabsChange = (index) => {
    let tool;
    if (index === 0) {
      tool = "imageCreation";
    } else if (index === 1) {
      tool = "imageEditing";
    } else if (index === 2) {
      tool = "imageNarratives";
    } else if (index === 3) {
      tool = "avatarStreaming";
    }
    setSelectedTab(tool);
    handleImageChange();
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
            <Tab>Image Narratives</Tab>
            <Tab>Avatar Streaming</Tab>
          </TabList>
          <ToolOptions tool={selectedTab} />
        </GridItem>
        <GridItem overflowY="auto">
          <DisplayResults />
        </GridItem>
        <GridItem
          position="fixed"
          marginRight="auto"
          left="0"
          bottom="0"
          width="full"
          bgGradient="linear(to-t, silver 50%, transparent)"
        >
          <TabPanels>
            <TabPanel>
              <ImageCreateForm />
            </TabPanel>
            <TabPanel>
              <ImageEditForm />
            </TabPanel>
            <TabPanel>
              <ImageNarratives />
            </TabPanel>
            <TabPanel>
              <CreateStreamForm />
            </TabPanel>
          </TabPanels>
        </GridItem>
      </Tabs>
    </Grid>
  );
};

export default DashboardPage;
