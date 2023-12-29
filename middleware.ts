import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/utils/supabase/middleware';

export async function middleware(request: NextRequest) {
  try {
    const { supabase, response } = createClient(request);
    const session = await supabase.auth.getSession();
    const userId = session.data.session?.user.id;
    const access_token = session.data.session?.access_token;
    const refresh_token = session.data.session?.refresh_token;
    const token_type = session.data.session?.token_type;
    const provider_token = session.data.session?.provider_token;
    const provider_refresh_token = session.data.session?.provider_refresh_token;

    if (userId) {
      const { data: provider_token_check } = await supabase
        .from('public.oauth2tokens')
        .select('provider_token')
        .eq('user_id', userId)
        .single();

      if (!provider_token_check) {
        const { data: access_token_check } = await supabase
          .from('public.oauth2tokens')
          .select('access_token')
          .eq('user_id', userId)
          .single();

        if (!access_token_check) {
          await supabase
            .from('public.oauth2tokens')
            .insert([{
              user_id: userId, 
              provider_token: provider_token,
              provider_refresh_token: provider_refresh_token,
              access_token: access_token,
              refresh_token: refresh_token,
              token_type: token_type,
              expires_in: 'your_expiration_date_here' // Make sure this is a valid timestamp
            }]);
        }
      }
    }

    return response;
  } catch (e) {
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
