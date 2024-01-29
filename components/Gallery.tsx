'use client'
import React, { useState } from 'react';
import { VStack, Tooltip, Text, Center, Box, Flex, Image, Modal, ModalBody, ModalContent, ModalOverlay, IconButton, Spacer, Card } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { createClient } from '@/utils/supabase/client';
import { ContentItem } from '@/types';
import { useGallery } from '@/lib/replicate/useGallery';
// ... (imports and other code)

export const GallerySm: React.FC<{ contentItems: ContentItem[] }> = ({ contentItems }) => {
  const { currentIndex, isModalOpen, handleImageClick, closeModal } = useGallery();

  return (
    <Box>
      <Flex direction="row" justifyContent="space-between">
        <Box display="flex" flexWrap="wrap" justifyContent="center" gap="20px">
          {contentItems.map((item, index) => (
            <Box bgColor="white" borderRadius="5px" padding="8px" key={item.content_id}>
              <Tooltip label={item.prompt}>
                <Image
                  borderRadius="4px"
                  src={item.url}
                  width="100"
                  height="100"
                  onClick={() => handleImageClick(index)}
                />
              </Tooltip>
            </Box>
          ))}
          <Modal isOpen={isModalOpen} onClose={closeModal} size="2xl">
            <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(100px)" />
            <ModalContent>
              <ModalBody>
                <Center>
                  {currentIndex !== null && (
                    <Box>
                      <Image
                        boxShadow="0px 3px 3px"
                        height="auto"
                        width={{ base: "80vw", md: "50vw" }}
                        src={contentItems[currentIndex]?.url}
                        alt={contentItems[currentIndex]?.prompt}
                      />
                      <Text>{contentItems[currentIndex]?.prompt}</Text>
                    </Box>
                  )}
                </Center>
              </ModalBody>
            </ModalContent>
          </Modal>
        </Box>
      </Flex>
    </Box>
  );
};

export const GalleryLg: React.FC<{ contentItems: ContentItem[] }> = ({ contentItems }) => {
  const { currentIndex, setCurrentIndex, isModalOpen, handleImageClick, closeModal } = useGallery();

  const handleArrowClick = (direction: 'left' | 'right') => {
    setCurrentIndex((prevIndex) => {
      const totalPages = contentItems.length;
      if (direction === 'left') {
        return prevIndex > 0 ? prevIndex - 1 : totalPages - 1;
      } else {
        return prevIndex < totalPages - 1 ? prevIndex + 1 : 0;
      }
    });
  };

  return (
    <Flex justifyContent="center" alignItems="center">
      <Box borderRadius="lg" maxWidth="90vw" height="auto" boxShadow="0px 4px 8px">
        <Card margin="1rem">
          <Flex direction="row">
            <IconButton
              aria-label="Previous Image"
              icon={<ChevronLeftIcon />}
              onClick={() => handleArrowClick('left')}
              position="fixed"
              left="5px"
              top="50%"
              zIndex="2"
              display="block"
              boxShadow="0px 3px 3px"
            />
            <Spacer />
            <VStack>
              <Image
                margin="2rem"
                maxWidth={{ base: '60vw', md: '80vw' }}
                maxHeight={{ base: '60vh', md: '50vh' }}
                src={contentItems[currentIndex]?.url}
                alt={contentItems[currentIndex]?.prompt}
                onClick={() => handleImageClick(0)}
                boxShadow="2px 0px 8px"
              />
              <Text mt="10px">{contentItems[currentIndex]?.prompt}</Text>
            </VStack>
            <Spacer />
            <IconButton
              aria-label="Next Image"
              icon={<ChevronRightIcon />}
              onClick={() => handleArrowClick('right')}
              position="fixed"
              right="5px"
              top="50%"
              zIndex="2"
              display="block"
              boxShadow="0px 3px 3px"
            />
          </Flex>
        </Card>
        <Modal isOpen={isModalOpen} onClose={closeModal} size="2xl" motionPreset="scale">
          <ModalOverlay backdropFilter="blur(500px)" />
          <ModalContent>
            <ModalBody>
              <Flex direction="column">
                <Center>
                  <Image
                    boxShadow="0px 3px 3px"
                    maxHeight="60vh"
                    maxWidth="50vw"
                    src={contentItems[currentIndex]?.url}
                    alt={contentItems[currentIndex]?.prompt}
                  />
                  <Text>{contentItems[currentIndex]?.prompt}</Text>
                </Center>
              </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </Flex>
  );
};
