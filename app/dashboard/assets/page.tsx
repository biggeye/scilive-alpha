'use client';
import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import Gallery from '@/components/Gallery';
import { Box } from '@chakra-ui/react';
import { parseGalleryImages } from '@/lib/gallery/getGalleryItems';
import { ContentItem } from '@/types';

const GalleryPage: React.FC = () => {
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      const data = await parseGalleryImages();
      setContentItems(data.flat()); // Assuming parseGalleryImages returns ContentItem[][]
    };
    fetchData();
  }, []);

  // Handler for edit action - stub for now
  const handleEdit = (id: string) => {
    console.log('Edit item with id:', id);
    // Implement edit logic here
  };

  // Handler for delete action - stub for now
  const handleDelete = async (id: string) => {
    console.log('Delete item with id:', id);
    // Implement delete logic here
    // Example: Remove item from contentItems state after deletion
    const filteredItems = contentItems.filter(item => item.content_id !== id);
    setContentItems(filteredItems);
  };

  return (
    <Box>
      <Gallery
        items={contentItems.map(item => ({
          id: item.content_id,
          url: item.url,
          title: item.title,
          prompt: item.prompt,
        }))}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </Box>
  );
};

export default GalleryPage;
