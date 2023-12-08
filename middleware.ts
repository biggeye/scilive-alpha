import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  try {

    const { supabase, response } = createClient(request)
    await supabase.auth.getSession()
    console.log(response)
    return response
  } catch (e) {

    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    })
  }
}