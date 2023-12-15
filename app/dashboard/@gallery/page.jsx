"use client";

import { createClient } from "@/utils/supabase/client";
import Modal from "@/components/Modal";
import React, { useState, useEffect } from 'react';

const Gallery = () => {
  const [contentItems, setContentItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const supabase = createClient();

 const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    const fetchContent = async () => {
      const { data, error } = await supabase.from("master_content").select("*");

      if (error) {
        console.error("Error fetching content:", error);
      } else {
        setContentItems(data);
        console.log("contentItems: ", contentItems);
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
    <div className="gallery">
      <ul>
        {contentItems.map((item) => (
          <li
            fontSize="xs"
            key={item.content_id}
            onClick={() => openModal(item)}
          >
            <img src={item.url}
          </li>
        ))}
      </ul>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        item={selectedItem}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default Gallery;
