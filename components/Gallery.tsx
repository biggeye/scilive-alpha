'use client';
import React, { useState, useCallback } from 'react';
import { Card, Box, Flex, Image, Modal, ModalBody, ModalContent, ModalOverlay, Tooltip, IconButton, ModalHeader, ModalFooter, ModalCloseButton, Button } from '@chakra-ui/react';
import { StructuredList, StructuredListCell, StructuredListItem, StructuredListButton, StructuredListIcon } from '@saas-ui/react';
import { DeleteIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { ContentItem } from '@/types';
import { Pagination } from './utils/Pagination';
import { handleGalleryEditSelection } from '@/lib/replicate/handleGalleryEditSelection';
import { ContextMenu, ContextMenuTrigger } from '@saas-ui/react';
import CustomContextMenuList from './dashboard/ContextMenu'; // Adjust the import path as necessary
import { useRecoilState } from 'recoil';
import { userImageDataUriState, userImagePreviewState, userImageUploadState } from '@/state/replicate/prediction-atoms';

interface GalleryProps {
  contentItems: ContentItem[][];
  supabase: any; // Consider replacing `any` with a more specific type if available
  refresh: () => void;
  currentIndex: number | null;
  setCurrentIndex: (index: number | null) => void;
  currentGroup: number | null;
  setCurrentGroup: (group: number | null) => void;
  handleDelete: (contentId: string) => Promise<void>;
}

const Gallery: React.FC<GalleryProps> = ({
  contentItems,
  supabase,
  refresh,
  currentIndex,
  setCurrentIndex,
  currentGroup,
  setCurrentGroup,
  handleDelete,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState<boolean>(false);
  const [deletingContentId, setDeletingContentId] = useState<string | null>(null);
  const [userImageUpload, setUserImageUpload] = useRecoilState(userImageUploadState);
  const [userImagePreview, setUserImagePreview] = useRecoilState(userImagePreviewState);
  const [userImageDataUri, setUserImageDataUri] = useRecoilState(userImageDataUriState);

  const handleEditSelection = useCallback(async (imageUrl: string) => {
    const result = await handleGalleryEditSelection(imageUrl);
    if (result) {
      setUserImageUpload(result.file);
      setUserImagePreview(result.imagePreview);
      setUserImageDataUri(result.URI);
    }
  }, []);

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
      await handleDelete(deletingContentId);
      closeDeleteConfirmModal();
      refresh();
    }
  };

  const handleImageClick = (itemIndex: number) => {
    setCurrentIndex(itemIndex);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentIndex(null);
  };

  const goToNextGroup = () => {
    if (currentGroup !== null && currentGroup < contentItems.length - 1) {
      setCurrentGroup(currentGroup + 1);
    }
  };

  const goToPreviousGroup = () => {
    if (currentGroup !== null && currentGroup > 0) {
      setCurrentGroup(currentGroup - 1);
    }
  };

  // Render gallery UI for the current group with pagination controls
  return (
    <Box mt={9}>
  {currentGroup !== null && contentItems[currentGroup] && (
    <>
      <Flex direction="row" wrap="wrap" justifyContent="center" gap="20px" mb={5}>
        {contentItems[currentGroup].map((item, itemIndex) => (
         <Tooltip key={item.content_id} label={item.prompt} hasArrow bg="lightBlue" color="white">
            <ContextMenu>
            <ContextMenuTrigger>

         <Card key={itemIndex} boxShadow="xl">
         <StructuredList>
           <StructuredListItem href="#">
             <StructuredListCell width="auto" height="150">
             <Image
              boxShadow="sm"
              borderRadius="lg"
              width="150px"
              height="150px"
              cursor="pointer"
              src={item.url}
              alt={item.title}
              onClick={() => handleImageClick(itemIndex)}
              className="element-fade-in"
              _hover={{
                transform: 'scale(1.05)',
                transition: 'transform .75s',
              }}
            />
             </StructuredListCell>
             <StructuredListCell flex="1">
             {item.name}
             </StructuredListCell>
           </StructuredListItem> 
        </StructuredList>
         </Card>
                </ContextMenuTrigger>
         <CustomContextMenuList edit={() => handleEditSelection(item.url, )} />
         </ContextMenu>
         </Tooltip>
        ))}
      </Flex>
      <Pagination
        totalGroups={contentItems.length}
        currentGroup={currentGroup}
        setCurrentGroup={(newGroup) => setCurrentGroup(newGroup)}
      />
    </>
  )}
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
                  boxShadow="xl"
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
            <Button  mr={3} onClick={confirmDeleteItem}>
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
