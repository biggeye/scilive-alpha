// Gallery.tsx
'use client'
import React, { useEffect, useState } from 'react';
import { useUserContext } from '@/lib/UserProvider';
import { Switch } from '@chakra-ui/react';
import { GalleryLg } from '@/components/Gallery';
import { GallerySm } from '@/components/Gallery';
import { ContentItem } from '@/types';

export const Gallery = () => {
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [isThumbnailView, setIsThumbnailView] = useState(false);
  const { supabase } = useUserContext();

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
  }, [supabase]);

  const toggleView = () => setIsThumbnailView(!isThumbnailView);

  return (
    <>
      <Switch id="thumbnail-toggle" isChecked={isThumbnailView} onChange={toggleView} colorScheme="lightBlue" />
      {isThumbnailView ? <GallerySm contentItems={contentItems} /> : <GalleryLg contentItems={contentItems} />}
    </>
  );
};

export default Gallery;
