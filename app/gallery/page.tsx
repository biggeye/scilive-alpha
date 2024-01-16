'use client';
import React, { useEffect, useState } from 'react';
import { useUserContext } from '@/lib/UserProvider';
import { Modal, ModalOverlay, ModalBody, ModalContent, Image, Box, Button, Switch, FormControl, FormLabel } from '@chakra-ui/react';
import GalleryThumbnail from '@/components/GalleryThumbnail';

// Define the type for each content item
interface ContentItem {
  content_id: number;
  url: string;
  content_type: string;
}

const Gallery = () => {
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [isThumbnailView, setIsThumbnailView] = useState(false);
  const { supabase } = useUserContext();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("master_content")
          .select("*");
        if (error) throw error;
        setContentItems(data);
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteClick = async (content_id: any) => {
    // ... existing delete logic ...
  };

  const toggleView = () => {
    setIsThumbnailView(!isThumbnailView);
  }

const handleImageClick = () => {
    setIsModalOpen(true);
  };

  return (
    <Box>
      <FormControl display="flex" alignItems="center" marginBottom="1em">
        <FormLabel htmlFor="thumbnail-toggle" mb="0">
          Thumbnail View
        </FormLabel>
        <Switch id="thumbnail-toggle" isChecked={isThumbnailView} onChange={toggleView} />
      </FormControl>

      {isThumbnailView ? (
        <Box display="flex" flexWrap="wrap" justifyContent="center" gap="20px">
          {contentItems.map((item) => (
            <Box bgColor="white" borderRadius="5px" padding="5px" key={item.content_id} maxWidth="100px">
              <Image borderRadius="4px" src={item.url} alt={item.content_type} width="100" height="100" onClick={handleImageClick}/>
              <Button bgColor="orange" onClick={() => handleDeleteClick(item.content_id)} size="xxs">del</Button>
            </Box>
          ))}
<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} size="4xl">
          <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
          <ModalContent>
            <ModalBody>
              <Image src={contentItems[currentIndex]?.url} alt={contentItems[currentIndex]?.content_type} />
            </ModalBody>
          </ModalContent>
        </Modal>
        </Box>
      ) : (
        <GalleryThumbnail />
      )}
    </Box>
  );
};

export default Gallery;
