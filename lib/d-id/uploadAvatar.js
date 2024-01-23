import { v4 as uuidv4 } from "uuid";

export const uploadFileToBucket = async (
  userInFile,
  userAvatarUrl,
  supabase
) => {
  // generate a random UUID
  const avatarImageId = uuidv4();
  const imageUrl = await fetch(userAvatarUrl);
  const imageBlob = await imageUrl.blob();

  const { data, error } = await supabase.storage
    .from("avatars")
    .upload(`${avatarImageId}`, imageBlob, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Error uploading image to Supabase:", error);
    throw new Error("Error uploading image to Supabase");
  }
  return avatarImageId;
};

export default async function uploadAvatar(uploadedFileId, avatarName, userId, supabase) {
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${uploadedFileId}`;

  // Replace with your actual Supabase insert call
  const { data, error: insertError } = await supabase
    .from("avatars")
    .insert([
      {
        name: avatarName,
        friendlyname: avatarName,
        example: url,
        created_by: userId,
      },
    ]);

  if (insertError) {
    throw insertError;
  }

  // Handle successful upload and database insert
  // You can also update state or UI as needed
  console.log("Avatar uploaded and record created:", data);

  if (error2) {
    console.error("Error posting image data to Supabase:", error2);
    throw new Error("Error posting image data to Supabase!");
  }

  return url;
}
