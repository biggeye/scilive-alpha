import { NextApiRequest, NextApiResponse } from 'next';
import { createAvatar } from '@/lib/d-id/talks/createTalk';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    let requestBody = req.body;

    const avatarScript = requestBody.avatar_script;
    const sourceUrl = requestBody.source_url;

    const avatarResponse = await createAvatar(avatarScript, sourceUrl);
    res.status(200).json(avatarResponse);
  } catch (error) {
    console.error('API route error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
