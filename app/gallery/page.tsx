// 'use client'; is already at the top, indicating this component is client-side only.
'use client'
import React, { useEffect, useState } from 'react';
import { useUserContext } from '@/lib/UserProvider';
import { createClient } from '@/utils/supabase/client';
import Gallery from '@/components/Gallery';
import { ContentItem } from '@/types';

const GalleryPage: React.FC = () => {
  // This state will now hold an array of arrays of ContentItems.
  const [contentItems, setContentItems] = useState<ContentItem[][]>([]);
  const supabase = createClient();
  const { userProfile } = useUserContext();
  const userId = userProfile?.id;

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        try {
          const { data, error } = await supabase
            .from('master_content')
            .select('content_id, name, title, url, created_by, created_at, content, model_id, prediction_id, prompt, is_public')
            .eq('created_by', userId);
          if (error) throw error;
          if (data) {
            const chunkedData = chunkArray(data, 10);
            setContentItems(chunkedData);
          }
        } catch (error) {
          console.error("Error fetching content:", error);
        }
      }
    };
    fetchData();
  }, [userId]);

  function chunkArray<T>(array: T[], chunkSize: number): T[][] {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  }

  return (
    <div>
      {/* Assuming Gallery can handle an array of arrays */}
      <Gallery contentItems={contentItems} />
    </div>
  );
};

export default GalleryPage;
