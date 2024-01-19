import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  const { supabase, response } = createClient(request)

  try {
    const user = await supabase.auth.getSession()
    
    // Redirect to login page if no user session is found
    if (!user) {
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }

    // Continue with the response if a valid session is found
    return response
  } catch (e) {
    console.error('Error in middleware:', e)
    // Optional: Redirect to a custom error page or handle error differently
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
