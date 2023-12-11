import 
{ getUserId, 
  getMasterContent, 
} 
  from '@/utils/supabase/getPublicProfile';

  const GalleryLayout = ({ children }) => {
    const userId = getUserId();
    const galleryContent = getMasterContent();
    const url = galleryContent.url;
  
    return (
      <div className="gallery-container">
        {children}
      <div className="code">
      {userId}
      </div>
</div>
    );
  };
export default GalleryLayout;
