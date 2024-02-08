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
      refresh((prevKey: number) => prevKey + 1); // Increment the refreshKey to trigger a gallery refresh
  
      // Ensure currentGroup is not null before proceeding
      if (currentGroup !== null) {
        // Check if the deleted item was the last in its group
        if (contentItems[currentGroup] && contentItems[currentGroup].length === 1) {
          // If it was the only item in the group, move to the previous group or set to null if it was the only group
          if (currentGroup > 0) {
            setCurrentGroup(currentGroup - 1);
            // Ensure the new currentGroup is valid before using it as an index
            if (contentItems[currentGroup - 1]) {
              setCurrentIndex(contentItems[currentGroup - 1].length - 1); // Move to the last item of the previous group
            }
          } else {
            // No more groups left, reset indices
            setCurrentGroup(null);
            setCurrentIndex(null);
            setIsModalOpen(false); // Close the modal as there are no more items to display
          }
        } else {
          // If there are more items in the group, adjust currentIndex if necessary
          // Ensure currentIndex is not null before comparing it with the length
          if (currentIndex !== null && currentIndex >= contentItems[currentGroup].length) {
            setCurrentIndex(currentIndex - 1); // Move to the new last item in the current group
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
