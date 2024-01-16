"use client";
import React, { useState, useEffect } from 'react';
import { Grid, GridItem, Tabs, TabList, Tab, TabPanels, TabPanel, Box } from '@chakra-ui/react';
import ToolOptions from "@/components/dashboard/ToolOptions";
import DisplayResults from "@/components/dashboard/DisplayResults";
import ImageCreateForm from "@/components/dashboard/replicate/ImageCreateForm";
import ImageEditForm from "@/components/dashboard/replicate/ImageEditForm";
import ImageNarratives from "../../components/dashboard/replicate/ImageNarrativeForm";
import CreateStreamForm from "@/components/dashboard/d-id/CreateStreamForm";

const DashboardPage = () => {
  const [selectedTab, setSelectedTab] = useState("imageCreation");

  useEffect(() => {
    handleTabsChange(0);
  }, []);

  const handleTabsChange = (index) => {
    let tool;
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
          <GridItem>
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

        {/* New Gallery Thumbnail */}
      </Grid>
 
  );
};

export default DashboardPage;
