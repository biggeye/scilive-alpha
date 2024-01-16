'use client'
import React, { useEffect, useState } from 'react';
import { IconButton } from '@chakra-ui/react';
import { Image, Modal, ModalOverlay, ModalContent, ModalBody, Box } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { createClient } from '@/utils/supabase/client';

type ContentItem = {
  url: string;
  content_type: string;
};

interface GalleryThumbnailProps {
  contentItems: ContentItem[];
}

const GalleryThumbnail: React.FC<GalleryThumbnailProps> = () => {
    const supabase = createClient();
    const [showArrows, setShowArrows] = useState<boolean>(false);
    const [contentItems, setContentItems] = useState<ContentItem[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const { data, error } = await supabase
              .from("master_content")
              .select("*");
            if (error) throw error;
            setContentItems(data || []);
          } catch (error) {
            console.error("Error fetching content:", error);
          }
        };
    
        fetchData();
      }, []);

      if (contentItems.length === 0) {
        return <div>Loading...</div>; // Or any other placeholder content
      }

  type ArrowDirection = 'left' | 'right';

  const handleArrowClick = (direction: ArrowDirection) => {
    setCurrentIndex(prevIndex => {
      if (direction === 'left') {
        return prevIndex > 0 ? prevIndex - 1 : contentItems.length - 1;
      } else {
        return prevIndex < contentItems.length - 1 ? prevIndex + 1 : 0;
      }
    });
  };

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  return (
    <Box position="absolute" width="75vw" height="75vh" onMouseOver={() => setShowArrows(true)} onMouseOut={() => setShowArrows(false)}>
     <IconButton
  aria-label="Previous Image" // Add a descriptive label here
  icon={<ChevronLeftIcon />}
  onClick={() => handleArrowClick('left')}
  position="absolute"
  left="0"
  top="50%"
  zIndex="2"
  display={showArrows ? 'block' : 'none'}
/>
      <Image
        src={contentItems[currentIndex]?.url}
        alt={contentItems[currentIndex]?.content_type}
        onClick={handleImageClick}
      />
   <IconButton
  aria-label="Next Image" // Add a descriptive label here
  icon={<ChevronRightIcon />}
  onClick={() => handleArrowClick('right')}
  position="absolute"
  right="0"
  top="50%"
  zIndex="2"
  display={showArrows ? 'block' : 'none'}
/>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} size="4xl">
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent>
          <ModalBody>
            <Image src={contentItems[currentIndex]?.url} alt={contentItems[currentIndex]?.content_type} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default GalleryThumbnail;
