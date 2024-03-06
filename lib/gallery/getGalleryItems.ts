'use server'
import { chunkArray } from "@/utils/chunkArray";
import { fetchGalleryImages } from "../galleryServer";
import { GalleryImage } from '@/types';

export async function parseGalleryImages(): Promise<GalleryImage[][]> {
  try {
    const data = await fetchGalleryImages();
    if (!data) {
      console.error("No data fetched from gallery images");
      return []; 
    }
    const chunkedData = chunkArray(data, 10);
    console.log("Chunked data:", chunkedData);
    return chunkedData;
  } catch (error) {
    console.error("Error fetching gallery images:", error);
    return []; // Return an empty array in case of an error
  }
}
