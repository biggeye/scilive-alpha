// Assuming this is a Next.js API route file: /pages/api/did/talk/create.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { createAvatar } from '@/lib/d-id/talks/createTalk';

// Type for the expected request body
interface AvatarCreationRequest {
  avatar_script: string;
  source_url: string;
}

export default async function POST(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Validate request method
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }

    // Assuming the body has been automatically parsed as JSON by Next.js
    const requestBody: AvatarCreationRequest = req.body;

    // Validate request body content
    if (!requestBody.avatar_script || !requestBody.source_url) {
      return res.status(400).json({ error: 'Missing required fields: avatar_script or source_url' });
    }

    // Destructure the requestBody for easier access
    const { avatar_script, source_url } = requestBody;

    // Proceed with avatar creation
    const avatarResponse = await createAvatar(avatar_script, source_url);

    // Assuming createAvatar returns data that can be directly sent back
    res.status(200).json(avatarResponse);
  } catch (error) {
    console.error('API route error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
