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
  try {
    const { data, error } = await supabase
      .from("avatars")
      .insert([{
          name: avatarName,
          url: url,
          created_by: userId, 
      }]);

    if (error) {
      throw error;
    }

    // Handle successful upload and database insert
    console.log("Avatar uploaded and record created:", data);

    return data;
  } catch (error) {
    console.error("Error posting image data to Supabase:", error);
    throw new Error("Error posting image data to Supabase!");
  }

}
