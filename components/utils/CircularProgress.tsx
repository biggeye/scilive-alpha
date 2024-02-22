import React, { useState, useEffect } from 'react';
import { CircularProgress, CircularProgressLabel, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, useDisclosure } from '@chakra-ui/react';
import { predictionStatusState } from '@/state/replicate/prediction-atoms';
import { useRecoilValue } from 'recoil';

const ProgressIndicator: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [color, setColor] = useState('yellow');
  const predictionStatus = useRecoilValue(predictionStatusState)
  useEffect(() => {
    if (predictionStatus === 'starting') {
      setColor('yellow');
    } else if (predictionStatus === 'processing') {
      setColor('green');
    } else if (predictionStatus === 'succeeded') {
      setTimeout(() => {
        onOpen();
      }, 500); 
    }
  }, [predictionStatus, onOpen]);

  return (
    <div>
      <CircularProgress isIndeterminate color={color} value={predictionStatus === 'succeeded' ? 100 : 0} />
        <CircularProgressLabel>{predictionStatus === 'succeeded' ? 'Done' : 'Loading...'}</CircularProgressLabel>
    </div>
  );
};

export default ProgressIndicator;
