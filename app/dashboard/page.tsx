"use client";
import React, { useState, useEffect } from 'react';
import { Spacer, Grid, GridItem, Tabs, TabList, Tab, TabPanels, TabPanel, useBoolean } from '@chakra-ui/react';
import DisplayResults from "@/components/dashboard/DisplayResults";
import ImageCreateForm from "@/components/dashboard/replicate/ImageCreateForm";
import ImageEditForm from "@/components/dashboard/replicate/ImageEditForm";
import { predictionIsLoadingState } from "@/state/replicate/prediction-atoms";
import { useRecoilValue, useRecoilState } from "recoil";
import { selectedTabState, dashboardState } from '@/state/replicate/config-atoms';

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
      zIndex="1"
    >
      <Tabs
        fontSize={{ base: "sm", md: "md" }}
      variant="enclosed-colored"
      position="absolute" top="0px" align="center" width="100%" onChange={(index) => handleTabsChange(index)} colorScheme="lightBlue">
        <GridItem>
          <TabList   fontSize={{ base: "sm", md: "md" }}
          maxWidth={{ base: "375px", md: "650px" }}>
            <Tab   fontSize={{ base: "sm", md: "md" }} 
            fontWeight="bold">Create</Tab>
            <Tab   fontSize={{ base: "sm", md: "md" }}
            fontWeight="bold">Edit</Tab>
          </TabList>
        </GridItem>
        <GridItem overflowY="auto">
          <DisplayResults />
        </GridItem>
        <GridItem className="bottomInputFormFrame">
          <TabPanels className="tabPanelStyles">
            <TabPanel>
              <ImageCreateForm />
            </TabPanel>
            <TabPanel>
              <ImageEditForm />
            </TabPanel>
          </TabPanels>
        </GridItem>
      </Tabs>
    </Grid>
  );
};

export default DashboardPage;