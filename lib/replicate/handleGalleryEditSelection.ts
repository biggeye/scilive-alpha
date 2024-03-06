'use client'
import { convertToDataURI } from "../../utils/convertToDataURI";

export const handleGalleryEditSelection = async (imageUrl: string) => {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const file = new File([blob], "filename", { type: blob.type });
    const imagePreview = URL.createObjectURL(file);
    const URI = await convertToDataURI(file);

    return { file, imagePreview, URI };
  } catch (error) {
    console.error("Error fetching and processing image from URL:", error);
    return null;
  }
};
