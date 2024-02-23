import React, { useEffect, useState } from "react";
import { Box, Image, Button, Input, Spinner, Center } from "@chakra-ui/react";

export default function Avatar({ uid, url, size, onUpload, supabase, setProfileDetails }) {
  const [avatarUrl, setAvatarUrl] = useState(url); // Start with the provided URL
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    // Function to download image from Supabase storage
    async function downloadImage(path) {
      try {
        const { data, error } = await supabase.storage.from("avatars").download(path);
        if (error) {
          throw error;
        }

        const url = URL.createObjectURL(data);
        setAvatarUrl(url);
      } catch (error) {
        console.log("Error downloading image: ", error);
      }
    }
    if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
      setAvatarUrl(url); // It's an external URL, use it as is
    } else if (url) {
      downloadImage(url); // It's a Supabase URL, download the image
    }
  }, [url, supabase]);

  const uploadAvatar = async (event) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const filePath = `${uid}-${Math.random()}.${fileExt}`;

      let { error: uploadError } = await supabase.storage.from("avatars").upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      alert("Error uploading avatar!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box>
      {avatarUrl ? (
        <Image  borderRadius={"10px"} padding={"5px"} boxSize={size} src={avatarUrl} alt="Avatar" />
      ) : (
        <Box boxSize={size} bg="brand.600" />
      )}

      <Box w={size}>
        <Input
          type="file"
          id="avatar-input"
          accept="image/*"
          onChange={uploadAvatar}
          isDisabled={uploading}
          visibility="hidden"
          position="absolute"
        />
        <Center>
        <Button
          as="label"
          htmlFor="avatar-input"
          size="sm"
          isLoading={uploading}
          loadingText="Uploading..."
          variant="outline"
        >
          Upload
        </Button>
        </Center>
      </Box>
    </Box>
  );
}