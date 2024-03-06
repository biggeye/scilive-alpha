'use client'
import React, { Suspense } from 'react';
import { Skeleton, Tabs, Tab, TabList, TabPanels, TabPanel, VStack, Box, Grid, GridItem, Card, Link, Text } from '@chakra-ui/react';
import ImageCreator from '@/components/dashboard/ImageCreator';
import ImageEditor from '@/components/dashboard/ImageEditor';
import DisplayResults from '@/components/dashboard/DisplayResults';
import VoiceCloner from '@/components/dashboard/VoiceCloner';
import ScriptWriter from '@/components/dashboard/ScriptWriter';
import AvatarCreator from '@/components/dashboard/AvatarCreator';

import { useRecoilValue } from 'recoil';
import { viewModeState } from '@/state/user/user_state-atoms';

const DashboardPage = () => {
  const viewMode = useRecoilValue(viewModeState);

  const renderTabs = () => (
       <Tabs
        fontSize={{ base: "sm", md: "md" }}
        variant="enclosed-colored"
      >
        <TabList mb="1em">
          <Tab>Image Creator</Tab>
          <Tab>Image Editor</Tab>
          <Tab>Script Writer</Tab>
          <Tab>Voice Cloner</Tab>
          <Tab>Avatar Creator</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <VStack spacing={1}>
              <DisplayResults localPage="createImage" />   // TODO toolOptions  is rendering incorrect list of models for createImage / imageCreator
              <Box position="fixed" backdropFilter="blur(50px)" width="98vw" bottom="0px">
                <ImageCreator />
              </Box>
            </VStack>
          </TabPanel>
          <TabPanel>
            <VStack spacing={1}>
              <DisplayResults localPage="editImage" />     // TODO ImageEditor gallery sidepanel opens, but with no contents
                <Box position="fixed" backdropFilter="blur(50px)" width="98vw" bottom="0px">
                  <ImageEditor />
                </Box>
            </VStack>
          </TabPanel>
          <TabPanel>
            <VStack spacing={1}>
              <ScriptWriter />
            </VStack>
          </TabPanel>
          <TabPanel>
            <VStack spacing={1}>
              <VoiceCloner />
            </VStack>
          </TabPanel>
          <TabPanel>
            <VStack spacing={1}>
              <AvatarCreator />
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
  )

  const renderGrid = () => (

    <Grid
      templateAreas={{
        lg: `"panel createDisplay editDisplay "
           "panel createDisplay editDisplay"
           "voice script avatar`,
        base: `"display display"
               "create edit"
              "avatar voice"
              "script script"
              "footer footer"` }}
      gridTemplateColumns={{ base: '60vw 35vw', lg: '50vw 45vw' }}
      gridTemplateRows={{ base: '5', lg: '3' }}
      h='92vh'
      w='100vw'
      gap='1'
      color='blackAlpha.700'
      fontWeight='bold'
    >
      <GridItem area="createDisplay">
        <DisplayResults localPage="createImage" />
        <ImageCreator />
      </GridItem>
      <GridItem area="editDisplay">
        <DisplayResults localPage="editImage" />
        <ImageEditor />
      </GridItem>
      <GridItem area="panel">
        <Box
          w="55vw"
          h="auto"
          bgColor="silver"
          borderRadius="md">

        </Box>
      </GridItem>
      <GridItem area="avatar">
        <AvatarCreator />
      </GridItem>
      <GridItem area="voice">
        <VoiceCloner />
      </GridItem>
      <GridItem area="script">
        <ScriptWriter />
      </GridItem>
      <GridItem area="footer">

      </GridItem>
    </Grid>
  );

  return (
    <Box>
      {viewMode === 'tabs' ? renderTabs() : renderGrid()}
    </Box>
  );
};

export default DashboardPage;