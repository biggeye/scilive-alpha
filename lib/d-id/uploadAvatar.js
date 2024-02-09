// This code assumes you're using Supabase for storage and have set up the necessary client and utilities.

import { v4 as uuidv4 } from "uuid";
import { createClient } from "@/utils/supabase/client";

// Helper function to convert a file to a Data URI
const convertFileToDataURI = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target.result);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(file);
  });
};

export const uploadFileToBucket = async (userInFile) => {
  const supabase = createClient();
  let imageBlob;

  // Extract the file extension
  const fileExtension = userInFile.name.split('.').pop();

  // Generate a unique file name with the original extension
  const uniqueFileName = `${uuidv4()}.${fileExtension}`;

  // Check if userInFile is a File object
  if (userInFile instanceof File) {
    // Convert file to Data URI, then to a blob
    const dataUri = await convertFileToDataURI(userInFile);
    imageBlob = await (await fetch(dataUri)).blob();
  } else {
    // If not a File object, handle accordingly (e.g., already a blob or another handling logic)
    console.error("The provided input is not a File object.");
    return;
  }

  // Upload the file with its extension
  const { data, error } = await supabase.storage
    .from("avatars")
    .upload(uniqueFileName, imageBlob, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Error uploading image to Supabase:", error);
    throw new Error("Error uploading image to Supabase");
  }

  // Construct the URL for the uploaded image
  const uploadedImageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${uniqueFileName}`;
  return uploadedImageUrl; // Return the URL of the uploaded image
};
