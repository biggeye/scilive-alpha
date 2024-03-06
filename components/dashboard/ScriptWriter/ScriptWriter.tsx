'use client'
import React, { useState } from 'react';
import { Grid, GridItem, FormLabel, CardHeader, Heading, Card, Button, Textarea, Box, VStack, HStack, Input, useToast } from '@chakra-ui/react';
import { Form, FormLayout } from '@saas-ui/react';
import { useRecoilState } from 'recoil';
import { avatarScriptState, webpageUrlState, hostNameState, podcastNameState } from '@/state/d-id/createTalk-atoms';

const ScriptWriter = () => {
  // Ensure initial state is an empty string instead of null
  const [hostName, setHostName] = useRecoilState(hostNameState);
  const [podcastName, setPodcastName] = useRecoilState(podcastNameState);
  const [webpageUrl, setWebpageUrl] = useRecoilState(webpageUrlState);
  const [avatarScript, setAvatarScript] = useRecoilState(avatarScriptState);
  const [isTextareaEnabled, setTextareaEnabled] = useState(false);
  const toast = useToast();

  const handlePageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWebpageUrl(event.target.value || ''); // Ensure value is never null
  };

  const handleScriptChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAvatarScript(event.target.value || ''); // Ensure value is never null
  };

  const fetchAvatarScript = async () => {
    if (!webpageUrl) {
      toast({
        title: "Error",
        description: "Please enter a webpage URL.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_DEFAULT_URL}/api/leap/websummary`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${process.env.NEXT_PUBLIC_LEAP_API_KEY || ''}`, // Ensures the value is a string
        },

        body: JSON.stringify({
          webpage_url: webpageUrl,
          host: hostName,
          podcast: podcastName
        }
        ),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setAvatarScript(data.website_summary);
      setTextareaEnabled(true); // Enable Textarea after successful API call
    } catch (error) {
      console.error('Error fetching script:', error);
      toast({
        title: "Error",
        description: "Failed to fetch script. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const generateVoiceover = () => {
    toast({
      title: "Success",
      description: "This feature is not yet available.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Grid templateAreas={`"topCard"
                         "bottomCard"`}
      templateRows="2">
      <GridItem area="topCard">
        <Card
          className="image-card"
          borderColor="onyx"
          borderWidth="0.5px"
          p={{ base: "1", md: "2", lg: "4" }}
          maxW="lg">
          <Form onSubmit={fetchAvatarScript} display="flex" flexDirection="column" alignItems="center" mb={4}>
            <CardHeader alignItems="center" justifyContent="space-between">
              <Heading>
                Voiceover Generator
              </Heading>
            </CardHeader>
            <FormLayout>
              <FormLabel>Host Name</FormLabel>
              <Input
                mb={4}
                value={hostName}
                onChange={(e) => setHostName(e.target.value)}
                placeholder="Host of the show"
              />
              <FormLabel>Podcast Name</FormLabel>
              <Input
                mb={4}
                value={podcastName}
                onChange={(e) => setPodcastName(e.target.value)}
                placeholder="Name of the podcast"
              />
              <FormLabel>Link to web page</FormLabel>
              <Input
                mb={4}
                value={webpageUrl}
                onChange={handlePageChange}
                placeholder="Enter the web article URL here"
              />
              <Button
    
                type="submit"
              >
                Fetch Script
              </Button>
            </FormLayout>
          </Form>
        </Card>
      </GridItem>

      <GridItem area="bottomCard">
        <Card
          className="featured-image-card">
          <Textarea
            mb={4}
            value={avatarScript}
            onChange={handleScriptChange}
            placeholder="The script will appear here"
            isDisabled={!isTextareaEnabled}
          />
          <Button
           
            onClick={generateVoiceover}
            isDisabled={!isTextareaEnabled} // Disable the update button until the script is fetched
          >
            Generate Voiceover
          </Button>
        </Card>
      </GridItem>

</Grid>
      );
};

      export default ScriptWriter;
