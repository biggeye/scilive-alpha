import React, { useState, useCallback } from 'react';
import { Button, Textarea, Box, VStack, HStack, useToast } from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import { avatarScriptState } from '@/state/d-id/d_id_talk-atoms';
import { webpageUrlState } from '@/state/replicate/prediction-atoms';

interface WriteScriptProps {
  onCompleted: () => void;
}

const WriteScript: React.FC<WriteScriptProps> = ({ onCompleted }) => { 
  const [webpageUrl, setWebPageUrl] = useRecoilState(webpageUrlState);
    const toast = useToast();


  const handlePageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setWebPageUrl(event.target.value);
  };


  const handleSubmit = () => {
    onCompleted();
  }
  return (
    <Box>
      <VStack spacing={4}>
        <HStack>
          <Textarea
            value={webpageUrl}
            onChange={handlePageChange}
            placeholder="Enter your script here..."
            size="lg"
          />
        </HStack>
        <HStack>
          <Button
            loadingText="Processing..."
            colorScheme="teal"
            onClick={handleSubmit}
          >
            Submit     
            </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default WriteScript;

