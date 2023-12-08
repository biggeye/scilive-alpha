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
  
    return (
      <div>
        <code>userId: {userId}</code>
        <code>url: {url}</code>
        <code>galleryContent title: {galleryContent.title}</code>
  
        {children}
      </div>
    );
  };
export default GalleryLayout;
