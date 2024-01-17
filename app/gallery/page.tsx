'use client';
import React, { useEffect, useState } from 'react';
import { useUserContext } from '@/lib/UserProvider';
import { Flex, Spacer, Center, Modal, ModalOverlay, ModalBody, ModalContent, Image, Box, Button, Switch, FormControl, FormLabel } from '@chakra-ui/react';
import GalleryLg from '@/components/Gallery';

interface ContentItem {
  content_id: number;
  url: string;
  content_type: string;
}

const Gallery = () => {
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [isThumbnailView, setIsThumbnailView] = useState(false);
  const { supabase } = useUserContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase.from("master_content").select("*");
        if (error) throw error;
        setContentItems(data);
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    };
    fetchData();
  }, []);

  const toggleView = () => setIsThumbnailView(!isThumbnailView);

  const handleImageClick = (index: number) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  return (
    <Box>
<Flex direction="row" justifyContent="space-between">
      <FormControl size="xs" display="flex" alignItems="center" marginBottom="1em">
        <Spacer />
        <FormLabel size="xs" htmlFor="thumbnail-toggle" mb="0">
          Thumbnail
        </FormLabel>
       
        <Switch id="thumbnail-toggle" isChecked={isThumbnailView} onChange={toggleView} />
        <Spacer />
      </FormControl>
      </Flex>
      {isThumbnailView ? (
        <Box display="flex" flexWrap="wrap" justifyContent="center" gap="20px">
          {contentItems.map((item, index) => (
            <Box bgColor="white" borderRadius="5px" padding="8px" key={item.content_id} maxWidth="100px">
              <Image borderRadius="4px" src={item.url} alt={item.content_type} width="100" height="100" onClick={() => handleImageClick(index)} />
            </Box>
          ))}
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} size="2xl">
            <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
            <ModalContent>
              <ModalBody>
                <Center>
                  {currentIndex !== null && (
                    <Image
                      boxShadow="0px 3px 3px"
                      height="80vh"
                      width="auto"
                      src={contentItems[currentIndex]?.url}
                      alt={contentItems[currentIndex]?.content_type} />
                  )}
                </Center>
              </ModalBody>
            </ModalContent>
          </Modal>
        </Box>
      ) : (
        <GalleryLg />
      )}
    </Box>
  );
};

export default Gallery;
