import React, { useEffect, useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useSelector, useDispatch } from 'react-redux';
import { selectImages, setImages, addImage, removeImage } from '@/utils/redux/gallerySlice';
import Card from './Card';
import Pagination from './Pagination';
import WarningModal from '../WarningModal';

export default function Gallery() {
  // State and hooks initialization
  const [selectedImage, setSelectedImage] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const rowsPerPage = 10;
  const supabase = useSupabaseClient();
  const images = useSelector(selectImages);
  const dispatch = useDispatch();

  // Handlers
  const handleDelete = imageUrl => {
    // Handle delete logic
  };

  const handleImageModalOpen = imageUrl => {
    setSelectedImage(imageUrl);
    // Open modal logic
  };

  useEffect(() => {
    async function fetchCards() {
      // Fetch cards logic
    }

    fetchCards();
  }, [page, supabase, refresh]);

  return (
    <div className="bg-gradient-to-b from-white to-gray-200 overflow-y-none text-sm md:text-md lg:text-lg xl:text-xl flex flex-col items-center justify-center">
      <div className="flex flex-col">
        <div className="p-10 w-full">
          {data.map(card => (
            <div key={card.id}>
              <Card
                id={card.id}
                imageUrl={card.url}
                createdAt={card.created_at}
                prompt={card.prompt}
                handleDelete={handleDelete}
                isLoading={isLoading}
                handleModalOpen={handleImageModalOpen}
              />
            </div>
          ))}
        </div>
        <Pagination currentPage={page} totalPages={total} onPageChange={page => setPage(page)} />
      </div>

      {/* WarningModal component */}
>

      <WarningModal
        isOpen={isDeleteImageOpen}
        onClose={onDeleteImageClose}
        onConfirm={handleDeleteConfirm}
        title="Confirm Delete"
        content="Are you sure you want to delete this Image?"
      />

      <Modal closeOnOverlayClick={false} isOpen={isImageModalOpen} onClose={onImageModalClose} size="xl">
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(90deg)" />
        <ModalContent>
          <ModalHeader>View Image</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>{selectedImage && <Image src={selectedImage} alt="Selected" />}</ModalBody>
          <ModalFooter>
            {selectedImage && (
              <Button as="a" href={selectedImage} download colorScheme="blue" mr={3}>
                Download
              </Button>
            )}
            <Button onClick={onImageModalClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
