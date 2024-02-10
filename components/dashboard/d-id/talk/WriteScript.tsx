import React, { useState, useCallback } from 'react';
import { Button, Textarea, Box, VStack, HStack, useToast } from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import { avatarScriptState } from '@/state/d-id/d_id_talk-atoms'; // Assuming scriptState is your Recoil state for managing the script content

// Example component for handling script writing and AI suggestions
const WriteScript = () => {
  const [avatarScript, setAvatarScript] = useRecoilState(avatarScriptState);
  const [assistedScript, setAssistedScript] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleAIAssist = useCallback(async () => {
    setLoading(true);
    try {
      // Example API call to Vercel AI SDK / OpenAI for generating text
      // Replace with actual API call and parameter handling
      const response = await fetch('/api/vercel-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: avatarScript, maxTokens: 100 }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch AI suggestions');
      }

      const data = await response.json();
      setAssistedScript(avatarScript + '\n' + data.suggestions); // Append AI suggestions to current script
      toast({
        title: 'AI Assistance',
        description: 'Suggestions added to your script.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error fetching AI suggestions:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch AI suggestions.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  }, [avatarScript, setAvatarScript, toast]);

  return (
    <VStack spacing={4} align="stretch">
      <Textarea
        value={avatarScript}
        onChange={(e) => setAvatarScript(e.target.value)}
        placeholder="Write your script here..."
        size="lg"
      />
      <HStack justifyContent="space-between">
        <Button colorScheme="teal" onClick={handleAIAssist} isLoading={loading}>
          Get AI Assistance
        </Button>
        <Button colorScheme="blue" /* Example next step trigger */>
          Next Step
        </Button>
      </HStack>
    </VStack>
  );
};

export default WriteScript;
