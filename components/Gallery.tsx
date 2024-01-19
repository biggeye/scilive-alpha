'use client';
import React, { useEffect, useState } from 'react';
import { Center, IconButton, Flex, Spacer, Card, Image, Modal, ModalOverlay, ModalContent, ModalBody, Box } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { createClient } from '@/utils/supabase/client';

type ContentItem = {
  url: string;
  content_type: string;
};

const GalleryLg: React.FC = () => {
  const supabase = createClient();
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
    return <div>Loading...</div>;
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
    <Flex justifyContent="center" alignItems="center">
      <Box borderRadius="lg" maxWidth="90vw" height="auto" boxShadow="0px 4px 8px">
        <Card margin="1rem">
          <Flex direction="row">
            <IconButton
              aria-label="Previous Image"
              icon={<ChevronLeftIcon />}
              onClick={() => handleArrowClick('left')}
              position="fixed"
              left="10px"
              top="50%"
              zIndex="2"
              display='block'
              boxShadow="0px 3px 3px"
            />
            <Spacer />
            <Image
              margin="2rem"
              maxWidth="85vh"
              src={contentItems[currentIndex]?.url}
              alt={contentItems[currentIndex]?.content_type}
              onClick={handleImageClick}
              boxShadow="2px 0px 8px"
            />
            <Spacer />
            <IconButton
              aria-label="Next Image"
              icon={<ChevronRightIcon />}
              onClick={() => handleArrowClick('right')}
              position="fixed"
              right="10px"
              top="50%"
              zIndex="2"
              display='block'
              boxShadow="0px 3px 3px"
            />
          </Flex>
        </Card>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} size="2xl">
          <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
          <ModalContent>
            <ModalBody>
              <Center>
                <Image 
                boxShadow="0px 3px 3px"
              height="80vh"
              width="auto"
              src={contentItems[currentIndex]?.url} 
              alt={contentItems[currentIndex]?.content_type} />
            </Center>
              
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </Flex>
  );
};

export default GalleryLg;
