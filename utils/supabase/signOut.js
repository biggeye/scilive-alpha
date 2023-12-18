'use server'

import { createClient } from './server';
import { cookies } from 'next/headers';

const signOut = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  await supabase.auth.signOut();

}