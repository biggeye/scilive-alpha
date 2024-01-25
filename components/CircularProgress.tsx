import React, { useState, useEffect } from 'react';
import { CircularProgress, CircularProgressLabel, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, useDisclosure } from '@chakra-ui/react';
import { predictionStatusState } from '@/state/prediction-atoms';
import { useRecoilValue } from 'recoil';

const ProgressIndicator: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [color, setColor] = useState('yellow');
  const predictionStatus = useRecoilValue(predictionStatusState)
  useEffect(() => {
    if (predictionStatus === 'starting') {
      setColor('yellow');
    } else if (status === 'processing') {
      setColor('green');
    } else if (status === 'succeeded') {
      setTimeout(() => {
        onOpen();
      }, 500); // Delay to show fade-out effect
    }
  }, [status, onOpen]);

  // Include JSX to be rendered by the component
  return (
    <div>
      <CircularProgress isIndeterminate color={color} value={status === 'succeeded' ? 100 : 0}>
        <CircularProgressLabel>{status === 'succeeded' ? 'Done' : 'Loading...'}</CircularProgressLabel>
      </CircularProgress>

      {/* Additional UI elements can be added here */}
    </div>
  );
};

export default ProgressIndicator;
