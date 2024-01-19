"use client";
import React, { useState, useEffect } from 'react';
import { Grid, GridItem, Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import ToolOptions from '@/components/dashboard/ToolOptions';
import DisplayResults from "@/components/dashboard/DisplayResults";
import ImageCreateForm from "@/components/dashboard/replicate/ImageCreateForm";
import ImageEditForm from "@/components/dashboard/replicate/ImageEditForm";
import ImageNarratives from "../../components/dashboard/replicate/ImageNarrativeForm";
import CreateStreamForm from "@/components/dashboard/d-id/CreateStreamForm";
import { predictionIsLoadingState } from "@/state/prediction-atoms";
import { useRecoilValue, useRecoilState } from "recoil";
import { selectedTabState, dashboardState } from '@/state/config-atoms';
import { ScrollableThumbnails } from '@/components/ScrollableThumbnails';

type ToolType = string
const DashboardPage: React.FC = () => {
  const [dashboardState, setDashboardState] = useRecoilState(selectedTabState);
  const [selectedTab, setSelectedTab] = useRecoilState(selectedTabState);
  const predictionIsLoading = useRecoilValue(predictionIsLoadingState);

  useEffect(() => {
    handleTabsChange(0);
  }, []);
  
  const handleTabsChange = (index: number) => {
    let tool: ToolType;
    switch (index) {
      case 0:
        tool = "imageCreation";
        break;
      case 1:
        tool = "imageEditing";
        break;
      case 2:
        tool = "imageNarratives";
        break;
      case 3:
        tool = "avatarStreaming";
        break;
      default:
        tool = "imageCreation"; // Default tool if no index matches
    }
    setSelectedTab(tool);
  };
  return (
    <Grid
      templateRows="3"
      templateColumns="1"
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100vw"
      overflowX="hidden"
      height="100%"
    >
      <Tabs align="center" width="100%" onChange={(index) => handleTabsChange(index)}>
        <GridItem>
          <TabList maxWidth="640px">
            <Tab>Image Creation</Tab>
            <Tab>Image Editing</Tab>
            <Tab>Image Narratives</Tab>
            <Tab>Avatar Streaming</Tab>
          </TabList>
        </GridItem>
        <GridItem overflowY="auto">
          <ToolOptions />
          <DisplayResults />
        </GridItem>
        <GridItem className="bottomInputFormFrame">
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