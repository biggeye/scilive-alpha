'use client'
import React, { useState } from 'react';
import { Box, Flex, Image, Modal, ModalBody, ModalContent, ModalOverlay, Tooltip } from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { ContentItem } from '@/types';
import { useRecoilState } from 'recoil';
import { currentIndexState, currentGroupState } from '@/state/gallery-atoms';
import { Button, ModalHeader, ModalFooter, ModalCloseButton } from '@chakra-ui/react';

interface GalleryProps {
  contentItems: ContentItem[][];
  supabase: any;
  refresh: any;
}

const Gallery: React.FC<GalleryProps> = ({ contentItems, supabase, refresh }) => {
  const [currentIndex, setCurrentIndex] = useRecoilState(currentIndexState);
  const [currentGroup, setCurrentGroup] = useRecoilState(currentGroupState);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState<boolean>(false);
  const [deletingContentId, setDeletingContentId] = useState<string | null>(null);

  const openDeleteConfirmModal = (contentId: string) => {
    setDeletingContentId(contentId);
    setIsDeleteConfirmOpen(true);
  };

  const closeDeleteConfirmModal = () => {
    setIsDeleteConfirmOpen(false);
    setDeletingContentId(null);
  };

  const confirmDeleteItem = async () => {
    if (deletingContentId) {
      await deleteItem(deletingContentId);
      closeDeleteConfirmModal();
      refresh((prevKey: number) => prevKey + 1); 
            if (currentGroup !== null) {
        if (contentItems[currentGroup] && contentItems[currentGroup].length === 1) {
          if (currentGroup > 0) {
            setCurrentGroup(currentGroup - 1);
            if (contentItems[currentGroup - 1]) {
              setCurrentIndex(contentItems[currentGroup - 1].length - 1);
            }
          } else {
            setCurrentGroup(null);
            setCurrentIndex(null);
            setIsModalOpen(false); 
          }
        } else {
          if (currentIndex !== null && currentIndex >= contentItems[currentGroup].length) {
            setCurrentIndex(currentIndex - 1); 
          }
        }
      }
    }
  };
  
  
  const deleteItem = async (contentId: string) => {
    try {
      console.log(contentId);
      const { error } = await supabase
        .from('master_content')
        .delete()
        .eq('content_id', contentId);
      if (error) throw error;
    } catch (error) {
      console.error("Error deleting content:", error);
    }
  };


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
                <IconButton
                  aria-label="Delete item"
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  onClick={() => openDeleteConfirmModal(contentItems[currentGroup][currentIndex].content_id)}
                />
              </Box>
            </ModalBody>

          </ModalContent>
        </Modal>
      )}
           <Modal isOpen={isDeleteConfirmOpen} onClose={closeDeleteConfirmModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete this item?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={confirmDeleteItem}>
              Delete
            </Button>
            <Button variant="ghost" onClick={closeDeleteConfirmModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Gallery;
