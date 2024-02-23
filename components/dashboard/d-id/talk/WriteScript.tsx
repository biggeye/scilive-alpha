import React, { useState } from 'react';
import { FormControl, Heading, Card, Button, Textarea, Box, VStack, HStack, Input, useToast } from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import { avatarScriptState, webpageUrlState, hostNameState, podcastNameState } from '@/state/createTalk-atoms';

interface WriteScriptProps {
  onCompleted: () => void;
}

const WriteScript: React.FC<WriteScriptProps> = ({ onCompleted }) => {
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
    <Card p={5} boxShadow="xl" rounded="md" bg="white" width={{ base: '80vw', md: '60vw' }}>
      <VStack spacing={4}>
        <form>
          <Heading mb={9}>Generate Voiceover</Heading>
          <FormControl display="flex" alignItems="center">
            <Input
              value={hostName}
              onChange={(e) => setHostName(e.target.value)}
              placeholder="Host of the show"
            />
            <Input
              value={podcastName}
              onChange={(e) => setPodcastName(e.target.value)}
              placeholder="Name of the podcast"
            />
          </FormControl>
          <FormControl>
            <Input
              value={webpageUrl}
              onChange={handlePageChange}
              defaultValue="www.somewebsite.com/somearticle"
              placeholder="Enter the web article URL here"
            />

            <Button
              onClick={fetchAvatarScript}
            >
              Fetch Script
            </Button>
          </FormControl>
          <FormControl>
            <Textarea
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

          </FormControl>
        </form>
      </VStack>
    </Card>

  );
};

export default WriteScript;
