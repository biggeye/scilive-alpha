// Import necessary utilities and functions
import { createClient } from '@/utils/supabase/route';
import fetch from 'node-fetch'; // Ensure you're using a fetch polyfill compatible with your environment
import FormData from 'form-data'; // 'form-data' library for server-side form handling

export async function POST(req: any) {
  const supabase = createClient(req);
  const session = await supabase.auth.getSession();

  if (!session) {
    return {
      error: 'not_authenticated',
      description: 'The user does not have an active session or is not authenticated',
      status: 401
    };
  }

  // Assuming you've parsed the incoming FormData correctly into 'req.body'
  // This might involve using middleware specific to your server framework,
  // for example, 'multer' for Express.js, or a similar library for other frameworks.

  // Extract the form fields and file from the parsed incoming request
  const name = req.body.name; // The string variable
  const file = req.body.file; // The file variable

  try {
    const dIdFormData = new FormData();
    dIdFormData.append('name', name);
    // Assuming 'file' is a Blob or File-like object with 'stream', 'filename', and 'mimetype' properties
    // This might need adjustment based on how your environment represents uploaded files
    dIdFormData.append('file', file.stream(), file.filename);

    const dIdResponse = await fetch(`https://api.d-id.com/talks/streams`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_DID_BEARER_TOKEN}`,
        ...dIdFormData.getHeaders(), // Spread operator to include content-type boundary
      },
      body: dIdFormData,
    });

    if (!dIdResponse.ok) {
      const error = await dIdResponse.json();
      return { error: error, status: dIdResponse.status };
    }

    const dIdData = await dIdResponse.json();
    return { data: dIdData, status: 200 };
  } catch (error) {
    console.error('Error making API call to D-ID:', error);
    return { error: 'Internal server error', status: 500 };
  }
}
