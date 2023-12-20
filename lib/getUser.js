import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client'; // Ensure this path is correct

export default function getUser() {
  const supabase = createClient();
  const [userId, setUserId] = useState(null);

  return (
    <div>
      {/* Your component JSX */}
      User ID: {userId}
    </div>
  );
}
