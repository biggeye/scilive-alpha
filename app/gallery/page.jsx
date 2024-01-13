'use client'
import React, { useEffect, useState } from 'react';
import { useUserContext } from '@/lib/UserProvider';
import { Image, Box, Card, CardBody, CardFooter, CardHeader, Button } from '@chakra-ui/react';

const Gallery = () => {
  const [contentItems, setContentItems] = useState([]);
  const { supabase } = useUserContext();

  useEffect(() => {
    const fetchData = async () => {
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

  const handleDeleteClick = async (content_id) => {
    const confirmation = window.confirm("Are you sure you want to delete this item?");
    if (!confirmation) return;

    try {
      const { error } = await supabase
        .from("master_content")
        .delete()
        .match({ content_id: content_id });
      if (error) throw error;

      // Remove the item from the state to update the UI
      setContentItems(prevItems => prevItems.filter(item => item.content_id !== content_id));
    } catch (error) {
      console.error("Error deleting content:", error);
    }
  };

  return (
    <Box display="flex" flexWrap="wrap" justifyContent="center" gap="20px">
      {contentItems.map((item) => (
        <Box bgColor="white" borderRadius="5px" padding="5px" key={item.content_id} maxWidth="100px">
      
              <Image borderRadius="4px" src={item.url} alt={item.content_type} width="100" height="100" />
              <Button bgColor="orange" onClick={() => handleDeleteClick(item.content_id)} size="xxs">del</Button>
        </Box>
      ))}
    </Box>
  );
};

export default Gallery;
