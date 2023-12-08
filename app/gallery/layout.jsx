'use server'

import 
{ getUserId, 
  getMasterContent, 
  getProfile, 
  getSession } 
  from '@/utils/supabase/getPublicProfile';

  const GalleryLayout = ({ children }) => {
    const userId = getUserId();
    const galleryContent = getMasterContent();
    const url = galleryContent.url;
  
    return (
      <div className="gallery-container">
        {children}
      <div className="code">
        userId: {userId}<br />
        galleryContent: {galleryContent}<br />
        url: {url}<br />
      </div>
</div>
    );
  };
export default GalleryLayout;
