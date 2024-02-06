'use client'
import React, { useState } from 'react';
import { Box, Flex, Image, Modal, ModalBody, ModalContent, ModalOverlay, Tooltip } from '@chakra-ui/react';
import { ContentItem } from '@/types';

interface GalleryProps {
  contentItems: ContentItem[][];
}

const Gallery: React.FC<GalleryProps> = ({ contentItems }) => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [currentGroup, setCurrentGroup] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleImageClick = (groupIndex: number, itemIndex: number) => {
    setCurrentGroup(groupIndex);
    setCurrentIndex(itemIndex);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentIndex(null);
    setCurrentGroup(null);
  };

  return (
    <Box>
      {contentItems.map((group, groupIndex) => (
        <Flex key={groupIndex} direction="row" wrap="wrap" justifyContent="center" gap="20px" mb={5}>
          {group.map((item, itemIndex) => (
            <Tooltip key={item.content_id} label={item.prompt} hasArrow bg="lightBlue" color="white">
              <Image
                boxShadow="xl"
                borderRadius="lg"
                width="150px"
                height="150px"
                cursor="pointer"
                src={item.url}
                alt={item.title}
                onClick={() => handleImageClick(groupIndex, itemIndex)}
                className="element-fade-in"
                _hover={{
                  transform: 'scale(1.05)',
                  transition: 'transform .2s',
                }}
              />
            </Tooltip>
          ))}
        </Flex>
      ))}

      {isModalOpen && currentGroup !== null && currentIndex !== null && (
        <Modal isOpen={isModalOpen} onClose={closeModal} motionPreset="slideInBottom" size="xl">
          <ModalOverlay />
          <ModalContent bgGradient="linear(to-b, silver, seasalt)">
            <ModalBody p={5}>
              <Box textAlign="center" className="fade-in-from-top">
                <Image
                  borderRadius="lg"
                  src={contentItems[currentGroup][currentIndex].url}
                  alt={contentItems[currentGroup][currentIndex].title}
                  className="animated-shadow"
                />
                <Box mt={3} fontWeight="bold" fontSize="lg" color="onyx">
                  {contentItems[currentGroup][currentIndex].name}
                </Box>
                <Box fontSize="md" color="gray.600">
                  {contentItems[currentGroup][currentIndex].prompt}
                </Box>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default Gallery;
