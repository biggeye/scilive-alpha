"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

const GalleryPage = () => {
  const [contentItems, setContentItems] = useState([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchContent = async () => {
      const { data, error } = await supabase.from("master_content").select("*");

      if (error) {
        console.error("Error fetching content:", error);
      } else {
        setContentItems(data);
      }
    };
    fetchContent();
  }, []);

  const handleDelete = async (contentId) => {
    const { error } = await supabase
      .from("master_content")
      .delete()
      .match({ content_id: contentId });

    if (error) {
      console.error("Error deleting content:", error);
    } else {
      setContentItems((prevItems) =>
        prevItems.filter((item) => item.content_id !== contentId)
      );
    }
  };

  return (
    <div className="gallery-container">
      <div className="card-container">
        {contentItems.map((item) => (
          <div key={item.content_id}> {/* Ensure each child in a list has a unique key */}
            <img src={item.url} alt={item.title} />
            <button onClick={() => handleDelete(item.content_id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;
