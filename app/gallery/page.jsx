'use client'
import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Card, CardBody, CardFooter, CardHeader, Button } from '@chakra-ui/react';

const Gallery = () => {
  const [contentItems, setContentItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
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

  const handleDeleteClick = async (contentId) => {
    const confirmation = window.confirm("Are you sure you want to delete this item?");
    if (!confirmation) return;

    const supabase = createClient();
    try {
      const { error } = await supabase
        .from("master_content")
        .delete()
        .match({ content_id: contentId });
      if (error) throw error;

      // Remove the item from the state to update the UI
      setContentItems(prevItems => prevItems.filter(item => item.content_id !== contentId));
    } catch (error) {
      console.error("Error deleting content:", error);
    }
  };

  return (
    <Card>
      {contentItems.map((item) => (
        <React.Fragment key={item.content_id}>
          <CardHeader></CardHeader> 
          <CardBody>
            <img src={item.url} alt={item.content_type} />
          </CardBody>
          <CardFooter>
            <Button onClick={() => handleDeleteClick(item.content_id)} className="micro-account">
              Delete
            </Button>
          </CardFooter>
        </React.Fragment>
      ))}
    </Card>
 
  );
};

export default Gallery;
