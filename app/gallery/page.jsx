"use client";

import { createClient } from "@/utils/supabase/client";

import React, { useState, useEffect } from "react";

const Gallery = () => {
  const [contentItems, setContentItems] = useState([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchContent = async () => {
      const { data, error } = await supabase.from("master_content").select("*");

      if (error) {
        console.error("Error fetching content:", error);
      } else {
        setContentItems(data);
        // Consider logging outside this function to see the updated state
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
    <div className="card-container">
      {contentItems.map((item) => (
        <>
          <img key={item.content_id} src={item.url} alt={item.content_type} />
          <button onClick={handleDelete} className="micro-account">
            Delete
          </button>
        </>
      ))}
    </div>
  );
};

export default Gallery;
