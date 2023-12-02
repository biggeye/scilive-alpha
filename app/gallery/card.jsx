// (/app/@gallery/card.jsx)
import React from "react";

export default function Card({ imageUrl }) {

  
  return (
    <div className="mx-auto w-xs bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden">
      <img
        className="w-full h-56 object-cover"
        src={imageUrl}
        alt="Gallery Image"
      />
    </div>
  );
}
