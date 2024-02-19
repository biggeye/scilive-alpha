'use client'
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client'; // Ensure this points to your Supabase client initialization
import { imageArrayState } from '@/state/createTalk-atoms';
import { useRecoilState } from 'recoil';

const pollForImages = (predictionIdBase, totalImages = 4, interval = 5000) => {
  const supabase = createClient();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageArray, setImageArray] = useRecoilState(imageArrayState);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        let fetchedImages = [];
        const { data, error } = await supabase
          .from('master_content')
          .select('*')
          // Assuming 'prediction_id' can be filtered with a 'like' clause
          .like('prediction_id', `${predictionIdBase}%`);
        
        if (error) throw error;

        if (data && data.length > 0) {
          // Filter images that match the expected pattern (basePredictionId-integer)
          fetchedImages = data.filter((item) => {
            const regex = new RegExp(`^${basePredictionId}-\\d$`);
            return regex.test(item.prediction_id);
          });

          if (fetchedImages.length >= totalImages) {
            setImageArray(fetchedImages);
            setLoading(false);
          }
        }
      } catch (error) {
        console.error('Error fetching images:', error.message);
      }
    };

    const intervalId = setInterval(() => {
      fetchImages();
    }, interval);

    // Cleanup on unmount
    return () => clearInterval(intervalId);
  }, [basePredictionId, totalImages, interval]);

  return { images, loading };
};

export default pollForImages;