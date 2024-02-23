import { NextRequest } from "next/server";
// app/api/auth/callback/route.ts
export const runtime = "experimental-edge"

export async function POST(req: NextRequest) {
  const url = req.nextUrl.clone();
  const code = url.searchParams.get('code');


  
  if (!code) {
    return new Response('Authorization code not found', { status: 400 });
  }

  const clientId = process.env.META_CLIENT_ID;
  const clientSecret = process.env.META_CLIENT_SECRET;
  const redirectUri1 = process.env.META_REDIRECT_URI1;
  const redirectUri2 = process.env.META_REDIRECT_URI2;
    const params = new URLSearchParams({
    client_id: clientId ?? '',
    redirect_uri1: redirectUri1 ?? '',
    redirect_uri2: redirectUri2 ?? '',
    client_secret: clientSecret ?? '',
    code,
  });

  try {
    const tokenResponse = await fetch(`https://graph.facebook.com/v12.0/oauth/access_token?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!tokenResponse.ok) {
      throw new Error('Failed to exchange code for access token');
    }

    const tokenData = await tokenResponse.json();

    // Redirect or handle the tokenData (e.g., access_token) as needed
    return Response.redirect(new URL('/', req.url));
  } catch (error: any) { // Type assertion here
    return new Response(error.message || 'An unknown error occurred', { status: 500 });
  }
}
