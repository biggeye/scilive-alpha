'use server'

import Navbar from './navbar';
import { getSession, handleSignInWithPassword, handleSignout } from '@/lib/supabase-server';

export default async function Nav() {
  const session = getSession();

  return <Navbar user={session?.user} handleSignIn={handleSignInWithPassword} handleSignout={handleSignout}/>;
}