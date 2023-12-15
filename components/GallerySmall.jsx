"use client";

import { createClient } from "@/utils/supabase/client";
import Modal from "@/components/Modal";
import React, { useState, useEffect } from "react";

const GallerySmall = () => {
  const [session, setSession] = useState(null);
  const [contentItems, setContentItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );
    return () => {
      if (authListener && typeof authListener.unsubscribe === "function") {
        authListener.unsubscribe();
      }
    };
  }, []);

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
    <div className="gallery-small">
      {session ? (
        <div className="className=h-20 w-20 bg-gray-200 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition duration-300 ease-in-out">
          <img src="item.url" />
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        item={selectedItem}
        handleDelete={handleDelete} />
       </div>
      ) : (
        <div>
          No content found.
          </div>
      )}
    </div>
  );
};

export default GallerySmall;
