'use client'
import React, { useEffect, useState } from 'react';

const Gallery = () => {
  const [contentItems, setContentItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/content');
      const data = await response.json();
      setContentItems(data || []);
    };

    fetchData();
  }, []);

  return (
    <div className="card-container">
      {contentItems.map((item) => (
        <div key={item.content_id}>
          <img src={item.url} alt={item.content_type} />
          <button onClick={() => handleDeleteClick(item.content_id)} className="micro-account">
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Gallery;
