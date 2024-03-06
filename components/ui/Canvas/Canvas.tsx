'use client'
import React, { useState } from 'react';
import {
  FileUpload,
  FileUploadTrigger,
  FileUploadDropzone,
} from '@saas-ui/file-upload'
import {
  Box,
  Input,
  Button,
  Select,
  VStack,
  HStack,
  Text,
  useToast,
  IconButton,
} from '@chakra-ui/react';
import { PenToolIcon, CpuIcon, FileIcon } from 'lucide-react';

function CanvasComponent() {
  const [prompt, setPrompt] = useState('');
  const [files, setFiles] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const toast = useToast();

  const handleSelectChange = (e: any) => {
    setSelectedOption(e.target.value);
  };

  return (
    <HStack spacing={4}>
      <VStack spacing={4} align="stretch">
        <Text fontSize="xl">Canvas Component</Text>
        <Input
          placeholder="Enter prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
         <FileUpload
      /* Remove `getRootNode` in your code, only required for this example */
      maxFileSize={10248 * 10248}
      maxFiles={50}
      accept="image/*"
    >
      {({ files, clearFiles }) => (
        <FileUploadDropzone>
          <Text fontSize="sm">Drag your image(s) here</Text>
          {!files?.length ? (
            <FileUploadTrigger as={Button}>Select image(s)</FileUploadTrigger>
          ) : (
            <HStack>
              <Text fontSize="sm">{files.length} selected</Text>
              <Button
                onClick={(e) => {
                  e.stopPropagation()
                  clearFiles()
                }}
              >
                Clear
              </Button>
            </HStack>
          )}
        </FileUploadDropzone>
      )}
    </FileUpload>
        <Select placeholder="Select option" onChange={handleSelectChange}>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
        {/* Example Canvas Area */}
        <Box border="2px" borderColor="gray.200" w="full" h="200px">
          Canvas Area
        </Box>
      </VStack>
      <VStack>
        <IconButton
          aria-label="Tool 1"
          icon={<FileIcon />}
          onClick={() => console.log('Tool 1')}
        />
        <IconButton
          aria-label="Tool 2"
          icon={<PenToolIcon />}
          onClick={() => console.log('Tool 2')}
        />
        <IconButton
          aria-label="Tool 3"
          icon={<CpuIcon />}
          onClick={() => console.log('Tool 3')}
        />
      </VStack>
    </HStack>
  );
}

export default CanvasComponent;
