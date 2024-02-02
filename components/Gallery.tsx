// 'use client'; is already at the top, indicating this component is client-side only.
'use client'
import React, { useState } from 'react';
import { Box, Flex, Image, Modal, ModalBody, ModalContent, ModalOverlay, Tooltip } from '@chakra-ui/react';
import { ContentItem } from '@/types';

interface GalleryProps {
  contentItems: ContentItem[][]; // Adjusted to match the expected data structure.
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
        <Flex key={groupIndex} direction="row" wrap="wrap" justifyContent="center" gap="20px">
          {group.map((item, itemIndex) => (
            <Tooltip key={item.content_id} label={item.prompt} hasArrow>
              <Image
              width="75px"
              height="auto"
                cursor="pointer"
                src={item.url}
                alt={item.title}
                onClick={() => handleImageClick(groupIndex, itemIndex)}
                // Optional: Apply styles or animations as needed
              />
            </Tooltip>
          ))}
        </Flex>
      ))}

      {isModalOpen && currentGroup !== null && currentIndex !== null && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalBody
            height="auto"
            width="auto">
              <Image
                width="auto'"
                height="auto"
                src={contentItems[currentGroup][currentIndex].url}
                alt={contentItems[currentGroup][currentIndex].title}
                className="element-fade-in"
                // Optional: Apply styles or animations as needed
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default Gallery;
