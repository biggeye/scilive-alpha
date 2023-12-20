import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function Avatar({ uid, url, size, onUpload }) {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const supabase = createClient();
  const user = supabase.auth.getUser();

  useEffect(() => {
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

    if (url) {
      downloadImage(url);
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

      let { error: uploadError } = await supabase.storage.from("user_avatars").upload(filePath, file);

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
    <div className="box">
      {avatarUrl ? (
        <img className={`h-${size} w-${size} object-cover`} src={avatarUrl} alt="Avatar" />
      ) : (
        <div className={`h-${size} w-${size} bg-brand-200`}></div>
      )}
      <div className={`w-${size}`}>
        <input
          type="file"
          id="avatar-input"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
          className="dynamic-input-upload"
        />
        <label htmlFor="avatar-input" className={`block mt-2 text-sm font-medium text-gray-700`}>
          <button
            className={`py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed ${uploading ? 'opacity-50' : ''}`}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </label>
      </div>
    </div>
  );
}
