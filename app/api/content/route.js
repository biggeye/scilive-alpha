// app/api/content/route.js

import { fetchUserContent } from '@/lib/supabase-server';

export const runtime = 'experimental-edge';

export default {
  async GET(req, res) {
    const data = await fetchUserContent();
    if (!data) {
      return new Response(JSON.stringify({ error: 'Failed to fetch content' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } else {
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  },
  ALL(req, res) {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
};
