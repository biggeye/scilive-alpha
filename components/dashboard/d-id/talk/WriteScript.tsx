import React, { useState } from 'react';
import { Button, Textarea, Box, VStack, HStack, Input, useToast } from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import { avatarScriptState, webpageUrlState } from '@/state/createTalk-atoms';

interface WriteScriptProps {
  onCompleted: () => void;
}

const WriteScript: React.FC<WriteScriptProps> = ({ onCompleted }) => {
  // Ensure initial state is an empty string instead of null
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

    // Placeholder for the actual API call
    try {
      // Simulate an API call
      const response = await fetch('https://api.workflows.tryleap.ai/v1/runs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_LEAP_API_KEY || ''}`, // Ensures the value is a string
        },

        body: JSON.stringify({
          workflow_id: "wkf_U3tsr91oDF9UaL", // Unique ID of the workflow you want to run
          webhook_url: `${process.env.NEXT_PUBLIC_DEFAULT_URL}/api/leap/websummaryhook`, // Optional
          input: {
            webpage_url: webpageUrl,
          }
        }),
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

  const handleUpdateScript = () => {
    // Here, you can make an API call to update the script or perform any action required upon updating the script.
    onCompleted(); // Assuming this is called after updating the script successfully.
    toast({
      title: "Success",
      description: "Your script has been updated.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Box>
      <VStack spacing={4}>
        <Input 
          value={webpageUrl}
          onChange={handlePageChange}
          defaultValue="www.somewebsite.com/somearticle"
          placeholder="Enter the web article URL here"
        />
        <Button
          colorScheme="teal"
          onClick={fetchAvatarScript}
        >
          Fetch Script
        </Button>
        <Textarea
          value={avatarScript}
          onChange={handleScriptChange}
          placeholder="The script will appear here"
          isDisabled={!isTextareaEnabled}
        />
        <Button
          colorScheme="teal"
          onClick={handleUpdateScript}
          isDisabled={!isTextareaEnabled} // Disable the update button until the script is fetched
        >
          Update
        </Button>
      </VStack>
    </Box>
  );
};

export default WriteScript;
