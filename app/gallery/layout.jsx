'use server'

import 
{ getUserId, 
  getMasterContent, 
  getProfile, 
  getSession } 
  from '@/utils/supabase/getUser';

const GalleryLayout = ({ children }) => {
  const userId = getUserId();
  const galleryContent = getMasterContent();
  const url = galleryContent.url;
  
  console.log("Rendering children: ", children);

  return (
    <div>
    <code>userId: {userId}</code>
    <code>url: {url}</code>
    <code>galleryContent: {galleryContent}</code>

     {children}
    </div>
  );
};

export default GalleryLayout;
