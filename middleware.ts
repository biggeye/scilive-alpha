import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  try {
    const { supabase, response } = createClient(request);
    const { data: session, error } = await supabase.auth.getSession();
    const user = await supabase.auth.getUser();
    if (error) {
      // Handle the error, e.g., log it or return an error response
      console.error("Error retrieving session:", error.message);
      return NextResponse.redirect('/login'); // Redirect to login or error page
    }

    console.log("middleware response: ", response);
    console.log("middleware session: ", session);
    console.log("middleware user: ", user);
    return response
  } catch (e) {

    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    })
  }
}
