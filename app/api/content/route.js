// pages/api/content.js

import { fetchUserContent } from '@/lib/supabase-server';

export default async function (req, res) {
  if (req.method === 'GET') {
    const data = await fetchUserContent();
    if (!data) {
      res.status(500).json({ error: 'Failed to fetch content' });
    } else {
      res.status(200).json(data);
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
