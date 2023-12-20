'use server'
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    await supabase.auth.exchangeCodeForSession(code);
    if (!session) {
      console.error("No session exchanged!")
    }
    else {
      console.log("Session received: ", session)
    }

  }
  return NextResponse.redirect("http://localhost:3000/dashboard")
}