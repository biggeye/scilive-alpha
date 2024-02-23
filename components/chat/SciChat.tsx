import React from 'react';
import { Box, Button, Input, VStack } from '@chakra-ui/react';

interface ChatAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatAssistant = ({ isOpen, onClose }: ChatAssistantProps) => {
  if (!isOpen) return null;

  return (
    <Box position="fixed" bottom="20px" right="20px" bg="white" p={4} boxShadow="md" borderRadius="md">
      <VStack spacing={3}>
        <Input placeholder="Type your message..." />
        <Button >Send</Button>
      </VStack>
    </Box>
  );
};
