import { useState } from 'react';

export const useGallery = (initialIndex: number = 0) => {
  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleImageClick = (index: number) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return {
    currentIndex,
    setCurrentIndex,
    isModalOpen,
    handleImageClick,
    closeModal
  };
};
