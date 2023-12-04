'use client'

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function GalleryPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [contentItems, setContentItems] = useState([]);
  const supabase = createClient();

  useEffect(() => {
    const checkUser = async () => {
      const { data: session } = await supabase.auth.getUser();
      if (!session) {
        router.push('/login');
      } else {
        setUser(session.user);
      }
    };

    checkUser();
  }, [router, supabase.auth]);

  useEffect(() => {
    const fetchContent = async () => {
      const { data, error } = await supabase
        .from('master_content')
        .select('*');

      if (error) {
        console.error('Error fetching content:', error);
      } else {
        setContentItems(data);
      }
    };

    fetchContent();
  }, [supabase]);

  const handleDelete = async (contentId) => {
    const { error } = await supabase
      .from('master_content')
      .delete()
      .match({ content_id: contentId });

    if (error) {
      console.error('Error deleting content:', error);
    } else {
      setContentItems((prevItems) =>
        prevItems.filter((item) => item.content_id !== contentId)
      );
    }
  };

  return (
    <div>
      <h1>Gallery</h1>
      <div>
        {contentItems.map((item) => (
          <div key={item.content_id}>
            <img src={item.url} alt={item.title} />
            <button onClick={() => handleDelete(item.content_id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};
