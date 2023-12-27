import { fetchUserContent } from '@/lib/supabase-server';

export default async function GET(req, res) {
  if (req.method === 'GET') {
    const content = await fetchUserContent();
    res.status(200).json(content);
  } else {
    // Handle other HTTP methods or return an error
    res.status(405).end();
  }
}
