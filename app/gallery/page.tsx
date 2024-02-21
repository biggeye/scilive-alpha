'use client';
import React, { useEffect, useState } from 'react';
import { useUserContext } from '@/lib/user/UserProvider';
import { createClient } from '@/utils/supabase/client';
import Gallery from '@/components/Gallery';
import { ContentItem } from '@/types';
import { contentItemsState, currentIndexState, currentGroupState } from '@/state/gallery-atoms';
import { useRecoilState } from 'recoil';

const GalleryPage: React.FC = () => {
  const [contentItems, setContentItems] = useRecoilState<ContentItem[][]>(contentItemsState);
  const [currentIndex, setCurrentIndex] = useRecoilState<number | null>(currentIndexState);
  const [currentGroup, setCurrentGroup] = useRecoilState<number | null>(currentGroupState);
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const supabase = createClient();
  const { userProfile } = useUserContext();
  const userId = userProfile?.id;

// Inside GalleryPage component

useEffect(() => {
  const fetchData = async () => {
    console.log("Fetching data for userId:", userId);
    if (userId) {
      try {
        const { data, error } = await supabase
          .from('master_content')
          .select('content_id, name, title, url, created_by, created_at, content, model_id, prediction_id, prompt, is_public')
          .eq('created_by', userId);
        if (error) throw error;
        if (data) {
          console.log("Fetched data:", data);
          const chunkedData = chunkArray(data, 10);
          console.log("Chunked data:", chunkedData);
          setContentItems(chunkedData);
          // Initialize currentGroup to 0 if data is not empty
          if (chunkedData.length > 0 && currentGroup === null) {
            setCurrentGroup(0);
            console.log("Setting initial currentGroup to 0");
          }
        }
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    }
  };
  fetchData();
}, [userId, refreshKey]);

// Log the current states for troubleshooting
console.log("Current states - contentItems:", contentItems, "currentIndex:", currentIndex, "currentGroup:", currentGroup);


  const handleDelete = async (contentId: string) => {
    try {
      const { error } = await supabase
        .from('master_content')
        .delete()
        .eq('content_id', contentId);
      if (error) throw error;
  
      let newContentItems = [...contentItems];
      if (currentGroup !== null && currentIndex !== null) {
        newContentItems[currentGroup] = newContentItems[currentGroup].filter(item => item.content_id !== contentId);
        setContentItems(newContentItems);
  
        if (newContentItems[currentGroup]?.length === 0) {
          newContentItems.splice(currentGroup, 1);
          setCurrentGroup(currentGroup > 0 ? currentGroup - 1 : null);
        }
  
        if (newContentItems[currentGroup]?.length <= currentIndex) {
          setCurrentIndex(currentIndex > 0 ? currentIndex - 1 : null);
        }
      }
  
      setRefreshKey(prevKey => prevKey + 1);
    } catch (error) {
      console.error("Error deleting content:", error);
    }
  };
  

  function chunkArray<T>(array: T[], chunkSize: number): T[][] {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  }

  return (
    <div>
      <Gallery
        contentItems={contentItems}
        supabase={supabase}
        refresh={() => setRefreshKey(k => k + 1)}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        currentGroup={currentGroup}
        setCurrentGroup={setCurrentGroup}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default GalleryPage;
